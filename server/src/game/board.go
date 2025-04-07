package game

import (
	"math/rand"
)

const (
	RED = iota
	BLUE
	GREEN
	YELLOW
)

type Tile struct {
	Pos       *[2]uint16
	TileColor uint8
}

type Board struct {
	Tiles [6][6]*Tile
}

func NewBoard() *Board {
	tiles := [6][6]*Tile{}
	choices := []uint8{RED, BLUE, GREEN, YELLOW}

	for i := range tiles {
		for j := range tiles[i] {
			n := rand.Int31n(int32(len(choices) - 1))

			tiles[i][j] = &Tile{
				Pos:       &[2]uint16{uint16(i), uint16(j)},
				TileColor: uint8(n),
			}
		}
	}

	return &Board{
		Tiles: tiles,
	}
}
