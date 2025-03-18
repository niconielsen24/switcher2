package repo

import (
	"github.com/niconielsen24/game/src/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Database struct {
	ConnStr string
	db      *gorm.DB
}

func (db *Database) Connect() error {
	dbptr, err := gorm.Open(mysql.Open(db.ConnStr), &gorm.Config{})
	if err != nil {
		return err
	}

	db.db = dbptr

	return nil
}

func (db *Database) AddUser(u *models.User) error {
	result := db.db.Create(u)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
func (db *Database) GetUser(email string) error {
	result := db.db.Where("email = ?", email).Find(&models.User{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}
func (db *Database) DeleteUser() error {
	return nil
}
func (db *Database) UpdateUSer() error {
	return nil
}
