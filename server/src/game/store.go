package game

import (
	"sync"
)

type GameStore struct {
	Games *sync.Map
}

func NewStore() *GameStore {
	return &GameStore{
		Games: &sync.Map{},
	}
}

func (s *GameStore) AddGame(g *Game) {
	s.Games.Store(g.ID, g)
}
