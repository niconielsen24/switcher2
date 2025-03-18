package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/niconielsen24/game-database/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	dbConnStr := os.Getenv("DB_CONN_STR")
	if dbConnStr == "" {
		log.Fatal("no db conn string")
	}

	db, err := gorm.Open(mysql.Open(dbConnStr), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected")

	if err := models.MigrateDb(db); err != nil {
		log.Fatal(err)
	}
}
