package main

import (
	"fmt"
	"reflect"
	"strings"
	"unicode"
)

func convertStructsToNodesAndPorts(structs ...interface{}) ([]PortType, []Node) {
	portTypesMap := make(map[string]PortType)
	nodesMap := make(map[string]Node)

	// Add string PortType
	portTypesMap["string"] = PortType{
		ID:    "string",
		Type:  "string",
		Label: "String",
	}

	for _, s := range structs {
		processStruct(s, portTypesMap, nodesMap)
	}

	// Deduplicate inputs and outputs based on the ID field
	for _, node := range nodesMap {
		// Use map to track unique input and output IDs
		uniqueInputMap := make(map[string]bool)
		uniqueOutputMap := make(map[string]bool)

		// Deduplicate Inputs
		uniqueInputs := []NodePort{}
		for _, input := range node.Inputs {
			if !uniqueInputMap[input.ID] {
				uniqueInputs = append(uniqueInputs, input)
				uniqueInputMap[input.ID] = true
			}
		}
		node.Inputs = uniqueInputs

		// Deduplicate Outputs
		uniqueOutputs := []NodePort{}
		for _, output := range node.Outputs {
			if !uniqueOutputMap[output.ID] {
				uniqueOutputs = append(uniqueOutputs, output)
				uniqueOutputMap[output.ID] = true
			}
		}
		node.Outputs = uniqueOutputs

		// Update the node in nodesMap after deduplication
		nodesMap[node.ID] = node
	}

	// Convert maps to slices
	ports := make([]PortType, 0, len(portTypesMap))
	for _, port := range portTypesMap {
		ports = append(ports, port)
	}

	nodes := make([]Node, 0, len(nodesMap))
	for _, node := range nodesMap {
		nodes = append(nodes, node)
	}

	return ports, nodes
}

func processStruct(s interface{}, portTypesMap map[string]PortType, nodesMap map[string]Node) {
	t := reflect.TypeOf(s)
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}

	if t.Kind() != reflect.Struct {
		return
	}

	typeName := strings.ToLower(t.Name())

	// Skip processing for marker types
	if typeName == "chimneynodeporthybrid" || typeName == "chimneynode" {
		return
	}

	// Add PortType if not already present
	if _, exists := portTypesMap[typeName]; !exists {
		portTypesMap[typeName] = PortType{
			ID:    typeName,
			Type:  typeName,
			Label: addSpacesToCamelCase(t.Name()),
		}
	}

	// Create or update Node
	node, exists := nodesMap[typeName]
	if !exists {
		node = Node{
			ID:          typeName,
			Description: fmt.Sprintf("A %s", strings.ToLower(addSpacesToCamelCase(t.Name()))),
			Type:        typeName,
			Label:       addSpacesToCamelCase(t.Name()),
			Inputs:      []NodePort{},
			Outputs:     []NodePort{},
		}
	}

	isNodePortHybrid := false

	// Track unique input and output ports
	inputPortMap := make(map[string]bool)
	outputPortMap := make(map[string]bool)

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		if field.Anonymous {
			// Check if it's a NodePortHybrid
			if field.Type.Name() == "ChimneyNodePortHybrid" {
				isNodePortHybrid = true
			}
			// Process embedded structs
			processStruct(reflect.New(field.Type).Elem().Interface(), portTypesMap, nodesMap)
			continue
		}

		fieldType := getPortType(field.Type)

		// Ensure the field type is in portTypesMap
		if _, exists := portTypesMap[fieldType]; !exists {
			portTypesMap[fieldType] = PortType{
				ID:    fieldType,
				Type:  fieldType,
				Label: addSpacesToCamelCase(fieldType),
			}
		}

		// Process nested struct types
		if field.Type.Kind() == reflect.Struct {
			processStruct(reflect.New(field.Type).Elem().Interface(), portTypesMap, nodesMap)
		}

		nodePort := NodePort{
			ID:    strings.ToLower(field.Name),
			Type:  fieldType,
			Name:  strings.ToLower(field.Name),
			Label: addSpacesToCamelCase(field.Name),
		}

		// Create a unique key for the map to check uniqueness (ID + Name)
		inputKey := nodePort.ID + ":" + nodePort.Name

		// Add unique inputs
		if !inputPortMap[inputKey] {
			node.Inputs = append(node.Inputs, nodePort)
			inputPortMap[inputKey] = true
		}
	}

	if isNodePortHybrid {
		nodeOutput := NodePort{
			ID:    typeName,
			Type:  typeName,
			Name:  typeName,
			Label: addSpacesToCamelCase(t.Name()),
		}

		// Create a unique key for output ports
		outputKey := nodeOutput.ID + ":" + nodeOutput.Name

		// Add unique outputs
		if !outputPortMap[outputKey] {
			node.Outputs = append(node.Outputs, nodeOutput)
			outputPortMap[outputKey] = true
		}
	}

	nodesMap[typeName] = node
}

func getPortType(t reflect.Type) string {
	switch t.Kind() {
	case reflect.String:
		return "string"
	default:
		return strings.ToLower(t.Name())
	}
}

func addSpacesToCamelCase(s string) string {
	var result strings.Builder
	for i, r := range s {
		if i > 0 && unicode.IsUpper(r) {
			result.WriteRune(' ')
		}
		result.WriteRune(r)
	}
	return result.String()
}
