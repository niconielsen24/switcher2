package game

import "github.com/google/uuid"

type GameState struct {
	ID      string
	Players []*player
	Board   *board
	Turn    *player
}

func NewGameState(p *player) *GameState {
	return &GameState{
		ID:      uuid.NewString(),
		Players: []*player{p},
		Board:   nil,
		Turn:    p,
	}
}
