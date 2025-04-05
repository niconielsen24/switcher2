package game

const (
	RED = iota
	BLUE
	GREEN
	YELLOW
)

type tile struct {
	Pos       [2]uint16
	TileColor uint8
	Figure    uint8
}

type board struct {
	Tiles [6][6]tile
}
