package game

import (
	"github.com/google/uuid"
)

type Player struct {
	ID       string
	Name     string
	Mov_deck [4]*movement_card
	Fig_deck [20]*figure_card
}

func NewPlayer(name string) *Player {
	fig_deck := [20]*figure_card{}

	for i := range fig_deck {
		fig_deck[i] = NewFigCard()
	}

	return &Player{
		ID:       uuid.NewString(),
		Name:     name,
		Mov_deck: [4]*movement_card{NewMovCard(), NewMovCard(), NewMovCard(), NewMovCard()},
		Fig_deck: fig_deck,
	}
}
