package game

import "github.com/google/uuid"

type Game struct {
	ID         string
	GameName   string
	MaxPlayers uint8
	Waiting    bool
	Active     bool
	Finnished  bool
	Players    []*Player
	Board      *Board
	Turn       *Player
}

func NewGameState(p *Player, name string, max_players uint8) *Game {
	return &Game{
		ID:         uuid.NewString(),
		GameName:   name,
		MaxPlayers: max_players,
		Waiting:    true,
		Active:     false,
		Finnished:  false,
		Players:    []*Player{p},
		Board:      NewBoard(),
		Turn:       p,
	}
}
