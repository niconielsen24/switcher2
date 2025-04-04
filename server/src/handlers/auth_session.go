package handlers

import (
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/niconielsen24/game/src/dto"
	"github.com/niconielsen24/game/src/repo"
)

func AuthSession(r repo.Repository) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("authorization")
		if err != nil {
			return c.JSON(http.StatusUnauthorized, echo.Map{"error": err.Error()})
		}
		secret_str := os.Getenv("JWT_SECRET")
		JWT_SECRET := []byte(secret_str)

		token, err := jwt.Parse(cookie.Value, func(t *jwt.Token) (any, error) {
			return JWT_SECRET, nil
		})

		if err != nil || !token.Valid {
			return c.JSON(http.StatusUnauthorized, echo.Map{"error": err.Error()})
		}

		claims, _ := token.Claims.(jwt.MapClaims)
		email, _ := claims["email"].(string)

		user, err := r.GetUserByEmail(email)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
		}

		user_dto := &dto.CreateUserResponseDTO{
			Username: user.Username,
			Email:    *user.Email,
		}

		return c.JSON(http.StatusOK, user_dto)
	}
}
