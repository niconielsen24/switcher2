package handlers

import (
	"net/http"
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/niconielsen24/game/src/models"
)

var Validate = validator.New(validator.WithRequiredStructEnabled())

func GenerateJWT(user *models.User) (string, error) {
	secret_str := os.Getenv("JWT_SECRET")
	JWT_SECRET := []byte(secret_str)

	claims := jwt.MapClaims{
		"userID":   user.ID,
		"username": user.Username,
		"email":    user.Email,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JWT_SECRET)
}

func GenerateCookie(jwt string) *http.Cookie {
	cookie := &http.Cookie{
		Name:     "authorization",
		Value:    jwt,
		HttpOnly: true,
		Secure:   false,                // TODO make secure true for deployment
		SameSite: http.SameSiteLaxMode, //TODO change for deployment
		Path:     "/",
	}

	return cookie
}
