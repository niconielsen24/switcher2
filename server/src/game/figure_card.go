package game

import (
	"math/rand"
	"time"

	"github.com/google/uuid"
)

const (
	Cube_fig uint8 = iota
	L_right_fig
	L_left_fig
	Long_L_right_fig
	Long_L_left_fig
	S_right_fig
	S_left_fig
	Big_S_right_fig
	Big_S_left_fig
	C_fig
	W_fig
)

type figure_card struct {
	ID         string
	FigureType uint8
}

func NewFigCard() *figure_card {
	rand := rand.New(rand.NewSource(time.Now().Unix()))

	return &figure_card{
		ID:         uuid.NewString(),
		FigureType: uint8(rand.Intn(11)),
	}
}
