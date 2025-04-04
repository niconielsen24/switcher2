package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func CreateGame(c echo.Context) error {
	return c.JSON(http.StatusOK, echo.Map{"message": "all good"})
}
