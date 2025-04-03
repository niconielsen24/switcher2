package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint      `gorm:"primaryKey"`
	Username  string    `gorm:"not null;size:255"`
	Email     *string   `gorm:"uniqueIndex;not null;size:255"`
	Password  *string   `gorm:"size:255"`
	GoogleID  *string   `gorm:"uniqueIndex;size:255"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoCreateTime"`
	UserStat  UserStat  `gorm:"foreignKey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UserStat struct {
	ID          uint      `gorm:"primaryKey"`
	UserID      uint      `gorm:"uniqueIndex;not null"`
	GamesPlayed int       `gorm:"default:0"`
	GamesWon    int       `gorm:"default:0"`
	GamesLost   int       `gorm:"default:0"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoCreateTime"`
}

func (u *User) AfterCreate(tx *gorm.DB) error {
	return tx.Create(&UserStat{UserID: u.ID}).Error
}

func MigrateDb(db *gorm.DB) error {
	return db.AutoMigrate(&User{}, &UserStat{})
}
