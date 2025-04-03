package repo

import "github.com/niconielsen24/game/src/models"

type Repository interface {
	Connect() error
	CreateUser(user *models.User) error
	GetUserByID(id uint) (*models.User, error)
	GetUserByEmail(email string) (*models.User, error)
	DeleteUser(id uint) error
	UpdateUser(user *models.User) error
}
