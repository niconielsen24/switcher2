package middlewares

import (
	"errors"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

var JWT_SECRET []byte

var ErrJwtSecretNotFOund = errors.New("could not find jwt secret")

func init() {
	str := os.Getenv("JWT_SECRET")
	JWT_SECRET = []byte(str)
}

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		cookie, err := c.Cookie("sessionToken")
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "unauthorized: missing session token")
		}

		token, err := jwt.Parse(cookie.Value, func(t *jwt.Token) (any, error) {
			return JWT_SECRET, nil
		})

		if err != nil || !token.Valid {
			return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized: invalid session token")
		}

		claims := token.Claims.(jwt.MapClaims)
		c.Set("userId", claims["userId"])
		c.Set("username", claims["username"])

		return next(c)
	}
}
