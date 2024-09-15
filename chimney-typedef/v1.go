package main

// ChimneyNodePortHybrid is an empty interface in this context
type ChimneyNodePortHybrid struct{}

// ChimneyNode is an empty interface in this context
type ChimneyNode struct{}

// ChimneyTextureReference represents a texture reference
type ChimneyTextureReference struct {
	ChimneyNodePortHybrid

	Path string `json:"path"`
}

// ChimneyBlockTexture represents textures for all sides of a block
type ChimneyBlockTexture struct {
	ChimneyNodePortHybrid

	Up    ChimneyTextureReference `json:"up"`
	Down  ChimneyTextureReference `json:"down"`
	North ChimneyTextureReference `json:"north"`
	South ChimneyTextureReference `json:"south"`
	East  ChimneyTextureReference `json:"east"`
	West  ChimneyTextureReference `json:"west"`
}

// ChimneyBlock represents a block with an identifier and texture
type ChimneyBlock struct {
	ChimneyNode

	Identifier string              `json:"identifier"`
	Texture    ChimneyBlockTexture `json:"texture"`
}
