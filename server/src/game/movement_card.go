package game

import (
	"math/rand"
	"time"

	"github.com/google/uuid"
)

const (
	Cross_mov uint8 = iota
	Cross_Long_mov
	Cross_Small_mov
	X_mov
	X_Long_mov
	X_Small_mov
	L_right_mov
	L_left_mov
)

type movement_card struct {
	ID       string
	MoveType uint8
}

func NewMovCard() *movement_card {
	rand := rand.New(rand.NewSource(time.Now().Unix()))

	return &movement_card{
		ID:       uuid.NewString(),
		MoveType: uint8(rand.Intn(8)),
	}
}
