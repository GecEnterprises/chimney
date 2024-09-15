package main

type V1Flume struct {
}

func (v *V1Flume) Build() (cdef ChimneyDef, err error) {
	ports, nodes := convertStructsToNodesAndPorts(
		ChimneyBlock{},
	)

	return ChimneyDef{
		Version: "1.0",
		Ports:   ports,
		Nodes:   nodes,
	}, nil
}
