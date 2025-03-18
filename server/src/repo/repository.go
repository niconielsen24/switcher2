package repo

import "github.com/niconielsen24/game/src/models"

type Repository interface {
	Connect() error
	CreateUser(u *models.User) error
	GetUser(u string) error
	DeleteUser() error
	UpdateUSer() error
}
