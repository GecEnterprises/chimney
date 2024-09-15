package main

import "fmt"

type V1Flume struct {
}

func (v *V1Flume) Build() (cdef ChimneyDef, err error) {
	ports, nodes := convertStructsToNodesAndPorts(
		ChimneyBlock{},
	)

	fmt.Println("Ports:")
	for _, port := range ports {
		fmt.Printf("%+v\n", port)
	}

	fmt.Println("\nNodes:")
	for _, node := range nodes {
		fmt.Printf("%+v\n", node)
	}

	return ChimneyDef{
		Version: "1.0",
		Ports:   ports,
		Nodes:   nodes,
	}, nil
}
