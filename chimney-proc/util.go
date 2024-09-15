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
		node.Inputs = deduplicatePorts(node.Inputs)
		node.Outputs = deduplicatePorts(node.Outputs)
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

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		if field.Anonymous {
			if field.Type.Name() == "ChimneyNodePortHybrid" {
				isNodePortHybrid = true
			}
			processStruct(reflect.New(field.Type).Elem().Interface(), portTypesMap, nodesMap)
			continue
		}

		fieldType := getPortType(field)

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

		node.Inputs = append(node.Inputs, nodePort)
	}

	if isNodePortHybrid {
		node.Outputs = append(node.Outputs, NodePort{
			ID:    typeName,
			Type:  typeName,
			Name:  typeName,
			Label: addSpacesToCamelCase(t.Name()),
		})
	}

	nodesMap[typeName] = node
}

func getPortType(field reflect.StructField) string {
	if ctypeTag, ok := field.Tag.Lookup("ctype"); ok {
		return strings.ToLower(ctypeTag)
	}

	switch field.Type.Kind() {
	case reflect.String:
		return "string"
	default:
		return strings.ToLower(field.Type.Name())
	}
}

func deduplicatePorts(ports []NodePort) []NodePort {
	uniqueMap := make(map[string]bool)
	result := []NodePort{}

	for _, port := range ports {
		key := port.ID + ":" + port.Name
		if !uniqueMap[key] {
			result = append(result, port)
			uniqueMap[key] = true
		}
	}

	return result
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
