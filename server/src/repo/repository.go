package repo

import "github.com/niconielsen24/game/src/models"

type Repository interface {
	Connect() error
	AddUser(u *models.User) error
	GetUser() error
	DeleteUser() error
	UpdateUSer() error
}
