package handlers

import (
	"net/http"
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
)

var Validate = validator.New(validator.WithRequiredStructEnabled())

func GenerateJWT(userId uint, username string) (string, error) {
	JWT_SECRET := []byte(os.Getenv("JWT_SECRET"))

	claims := jwt.MapClaims{
		"userID":   userId,
		"usernamd": username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JWT_SECRET)
}

func GenerateCookie(jwt string) *http.Cookie {
	cookie := new(http.Cookie)
	cookie.Name = "sessionToken"
	cookie.Value = jwt
	cookie.HttpOnly = true
	cookie.Secure = false // TODO make secure true for deployment
	cookie.SameSite = http.SameSiteStrictMode
	cookie.Path = "/"
	cookie.Expires = time.Now().Add(time.Hour * 72)

	return cookie
}
