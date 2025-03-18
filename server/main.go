package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/niconielsen24/game/src/repo"
)

var db repo.Repository

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}

	dbConnStr := os.Getenv("DB_CONN_STR")
	if dbConnStr == "" {
		log.Fatal("no database connection string")
	}

	db = &repo.Database{
		ConnStr: dbConnStr,
	}

	if err := db.Connect(); err != nil {
		log.Fatal(err)
	}
}

func main() {
	e := echo.New()

	e.Use(middleware.Logger())

	e.GET("/", func(c echo.Context) error { return c.String(http.StatusOK, "all good") })

	e.StdLogger.Fatal(e.Start(":1816"))
}
