package main

type PortType struct {
	ID    string `json:"id"`
	Type  string `json:"type"`
	Label string `json:"label"`
}

type NodePort struct {
	ID    string `json:"id"`
	Type  string `json:"type"`
	Name  string `json:"name"`
	Label string `json:"label"`
}

type Node struct {
	ID          string     `json:"id"`
	Description string     `json:"description"`
	Type        string     `json:"type"`
	Label       string     `json:"label"`
	Inputs      []NodePort `json:"inputs"`
	Outputs     []NodePort `json:"outputs"`
}

type DefVersion string

type ChimneyDef struct {
	Version DefVersion `json:"version"`
	Ports   []PortType `json:"ports"`
	Nodes   []Node     `json:"nodes"`
}

type ChimneyDefBuilder interface {
	Build() (cdef ChimneyDef, err error)
}
