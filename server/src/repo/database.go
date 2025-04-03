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

func (db *Database) CreateUser(u *models.User) error {
	result := db.db.Create(u)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (db *Database) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	result := db.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func (db *Database) GetUserByID(id uint) (*models.User, error) {
	var user models.User
	result := db.db.First(&user, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func (db *Database) DeleteUser(id uint) error {
	result := db.db.Delete(&models.User{}, id)
	return result.Error
}

func (db *Database) UpdateUser(user *models.User) error {
	result := db.db.Model(&models.User{}).Where("id = ?", user.ID).Updates(user)
	return result.Error
}
