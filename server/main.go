package main

import (
	"ToDo/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/register", handlers.Register)
	router.POST("/login", handlers.Login)
	router.GET("/todo/:id", handlers.GetToDo)
	router.POST("/add", handlers.AddToDo)
	router.Run("localhost:4000")
}
