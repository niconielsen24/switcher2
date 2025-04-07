package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/niconielsen24/game/src/game"
)

func CreateGame(c echo.Context) error {
	type creategamereq struct {
		Username   string `json:"username"`
		LobbyName  string `json:"lobbyName"`
		MaxPlayers uint   `json:"maxPlayers"`
	}
	req := &creategamereq{}
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}

	game := game.NewGameState(game.NewPlayer(req.Username), req.LobbyName, uint8(req.MaxPlayers))

	return c.JSON(http.StatusOK, echo.Map{
		"id":        game.ID,
		"lobbyName": game.GameName,
		"turn":      game.Turn.ID,
		"players":   game.Players[0].ID,
	})
}
