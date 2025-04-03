package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/niconielsen24/game/src/handlers"
	"github.com/niconielsen24/game/src/middlewares"
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

	e.Use(middlewares.CustomLoggerMiddleware(middlewares.LoggerConfig{
		UseJSON:    false,
		WithCaller: true,
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowHeaders:     []string{echo.HeaderAuthorization, echo.HeaderContentType},
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
		AllowCredentials: true,
	}))

	// 🔒 Protected Routes
	e.GET("/users/read", func(c echo.Context) error { return nil }, middlewares.AuthMiddleware)
	e.PATCH("/users/update", func(c echo.Context) error { return nil }, middlewares.AuthMiddleware)
	e.DELETE("/users/delete", func(c echo.Context) error { return nil }, middlewares.AuthMiddleware)

	// 🔓 Public Routes
	e.POST("/users/create", handlers.CreateUser(db))
	e.POST("/users/login", handlers.UserLogin(db))
	e.POST("/users/google-login", handlers.UserLoginGoogle(db))

	e.StdLogger.Fatal(e.Start(":1816"))
}
