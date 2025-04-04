package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/niconielsen24/game/src/dto"
	"github.com/niconielsen24/game/src/repo"
	"golang.org/x/crypto/bcrypt"
)

func UserLogin(r repo.Repository) echo.HandlerFunc {
	return func(c echo.Context) error {
		input := &dto.LoginRequestDTO{}
		if err := c.Bind(input); err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": err.Error(),
			})
		}

		user, err := r.GetUserByEmail(input.Email)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": "user does not exist",
			})
		}

		if user.GoogleID != nil && user.Password == nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": "this account is from google",
			})
		}

		psw_bytes := []byte(input.Password)
		hash_bytes := []byte(*user.Password)
		if err := bcrypt.CompareHashAndPassword(hash_bytes, psw_bytes); err != nil {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"error": err.Error(),
			})
		}

		jwt, err := GenerateJWT(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"error": err.Error(),
			})
		}

		cookie := GenerateCookie(jwt)

		c.SetCookie(cookie)

		response_user := &dto.CreateUserResponseDTO{
			Username: user.Username,
			Email:    *user.Email,
		}

		return c.JSON(http.StatusOK, echo.Map{"user": response_user})
	}
}
