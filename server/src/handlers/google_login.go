package handlers

import (
	"context"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/niconielsen24/game/src/dto"
	"github.com/niconielsen24/game/src/models"
	"github.com/niconielsen24/game/src/repo"
	"google.golang.org/api/idtoken"
)

func UserLoginGoogle(r repo.Repository) echo.HandlerFunc {
	return func(c echo.Context) error {
		token := &dto.GoogleLoginRequestDTO{}

		if err := c.Bind(token); err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": err.Error(),
			})
		}

		payload, err := validateGoogleToken(token.IDtoken)
		if err != nil {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"error": err.Error(),
			})
		}

		googleID, _ := payload.Claims["sub"].(string)
		email, _ := payload.Claims["email"].(string)
		name, _ := payload.Claims["name"].(string)

		user, err := r.GetUserByEmail(email)
		if err != nil {
			user := &models.User{
				Username: name,
				Email:    &email,
				GoogleID: &googleID,
				Password: nil,
			}

			if err := r.CreateUser(user); err != nil {
				return c.JSON(http.StatusInternalServerError, echo.Map{
					"error": err.Error(),
				})
			}
			if err := setCookie(c, user); err != nil {
				return c.JSON(http.StatusInternalServerError, echo.Map{"message": err.Error()})
			}

			return c.JSON(http.StatusOK, echo.Map{"message": "created account successfully"})
		}

		if user == nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": "account does not exist",
			})
		}

		if user.GoogleID == nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": "account already exists without google login",
			})
		}

		if err := setCookie(c, user); err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"message": err.Error()})
		}

		response_user := &dto.CreateUserResponseDTO{
			Username: user.Username,
			Email:    *user.Email,
		}

		return c.JSON(http.StatusOK, echo.Map{"user": response_user})
	}
}

func validateGoogleToken(id_token string) (*idtoken.Payload, error) {
	validator, err := idtoken.NewValidator(context.Background())
	if err != nil {
		return nil, err
	}

	GOOGLE_CLIENT_ID := os.Getenv("CLIENT_ID")

	payload, err := validator.Validate(context.Background(), id_token, GOOGLE_CLIENT_ID)
	if err != nil {
		return nil, err
	}
	return payload, nil
}

func setCookie(c echo.Context, user *models.User) error {
	jwt, err := GenerateJWT(user)
	if err != nil {
		return err
	}

	cookie := GenerateCookie(jwt)

	c.SetCookie(cookie)
	return nil
}
