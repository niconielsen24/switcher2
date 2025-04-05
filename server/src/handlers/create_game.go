package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/niconielsen24/game/src/game"
)

func CreateGame(c echo.Context) error {
	type creategamereq struct {
		Name string `json:"name"`
	}
	req := &creategamereq{}
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}

	game := game.NewGameState(game.NewPlayer(req.Name))

	return c.JSON(http.StatusOK, echo.Map{
		"id":      game.ID,
		"turn":    game.Turn.Name,
		"players": game.Players[0].Name,
	})
}
