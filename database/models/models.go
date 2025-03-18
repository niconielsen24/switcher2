package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Username  string `gorm:"uniqueIndex;not null;size:255"`
	Password  string `gorm:"not null;size:255"`
	CreatedAt time.Time
	UpdatedAt time.Time
	UserStat  UserStat `gorm:"foreignKey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UserStat struct {
	ID          uint `gorm:"primaryKey"`
	UserID      uint `gorm:"uniqueIndex;not null"`
	GamesPlayed int  `gorm:"default:0"`
	GamesWon    int  `gorm:"default:0"`
	GamesLost   int  `gorm:"default:0"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

func MigrateDb(db *gorm.DB) error {
	return db.AutoMigrate(&User{}, &UserStat{})
}
