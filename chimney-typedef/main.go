package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func main() {
	v := &V1Flume{}
	cdef, err := v.Build()

	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	// Convert cdef to JSON format
	data, err := json.MarshalIndent(cdef, "", "  ")
	if err != nil {
		fmt.Println("Error marshalling to JSON:", err)
		return
	}

	// Write the JSON data into cdef.json file
	err = os.WriteFile("cdef.json", data, 0644)
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return
	}

	fmt.Println("cdef.json file created successfully!")
}
