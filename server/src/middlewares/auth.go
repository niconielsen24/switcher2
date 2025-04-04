package middlewares

import (
	"errors"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

var ErrJwtSecretNotFOund = errors.New("could not find jwt secret")

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		secret_str := os.Getenv("JWT_SECRET")
		JWT_SECRET := []byte(secret_str)

		cookie, err := c.Cookie("authorization")
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "unauthorized: missing session token")
		}

		token, err := jwt.Parse(cookie.Value, func(t *jwt.Token) (any, error) {
			return JWT_SECRET, nil
		})

		if err != nil || !token.Valid {
			return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
		}

		claims := token.Claims.(jwt.MapClaims)
		c.Set("userID", claims["userID"])
		c.Set("username", claims["username"])

		return next(c)
	}
}
