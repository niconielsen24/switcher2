package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/niconielsen24/game/src/dto"
	"github.com/niconielsen24/game/src/models"
	"github.com/niconielsen24/game/src/repo"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(r repo.Repository) echo.HandlerFunc {
	return func(c echo.Context) error {
		input := dto.CreateUserDTO{}
		if err := c.Bind(&input); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
		}

		if err := Validate.Struct(&input); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}

		psw_hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		}
		psw_hash_string := string(psw_hash)

		user := models.User{
			Username: input.Username,
			Email:    &input.Email,
			Password: &psw_hash_string,
			GoogleID: nil,
		}

		if err := r.CreateUser(&user); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}

		response_user := dto.CreateUserResponseDTO{
			Username: user.Username,
			Email:    *user.Email,
		}

		return c.JSON(http.StatusCreated, response_user)
	}
}
