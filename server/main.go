package main

import (
	"ToDo/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	// Auth
	router.POST("/register", handlers.Register)
	router.POST("/login", handlers.Login)
	router.POST("/validate/:username", handlers.CheckUsername)
	router.POST("/validate/", handlers.EmptyUsername)
	// ToDo
	router.GET("/todo/:id", handlers.GetToDo)
	router.POST("/edit/:id", handlers.EditToDo)
	router.POST("/delete/:id", handlers.DeleteToDo)
	router.POST("/add", handlers.AddToDo)
	// Admin
	router.GET("/admin", handlers.GetUsers)
	router.POST("/admin/delete/:user", handlers.DeleteUser)
	router.Run("localhost:4000")
}
