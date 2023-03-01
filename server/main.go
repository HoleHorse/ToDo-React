package main

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	// router.Static("/static", "./static/")
	// router.GET("/", handlers.HomePage)
	// // Authentication and Authorization
	// router.GET("/logout", handlers.Logout)
	// router.GET("/login", handlers.LoginPage)
	// router.GET("/register", handlers.RegistrationPage)
	// router.POST("register", handlers.Register)
	// router.POST("/login", handlers.Login)
	// // ToDo operations
	// router.GET("/todo", handlers.ToDoPage)
	// router.GET("/add", handlers.AddToDoPage)
	// router.GET("/read/:id", handlers.ReadPage)
	// router.GET("/edit/:id", handlers.EditPage)
	// router.GET("/delete/:id", handlers.DeleteToDo)
	// router.POST("/add", handlers.AddToDo)
	// router.POST("/edit/:id", handlers.EditToDo)
	// // Seacrh, Group, Sort
	// router.GET("/search", handlers.ToDoPage)
	// router.GET("/sort", handlers.ToDoPage)
	// // Admin
	// router.GET("/admin/search", handlers.AdminPage)
	// router.GET("/admin/sort", handlers.AdminPage)
	// router.GET("/admin", handlers.AdminPage)
	// router.GET("admin/delete/:user", handlers.DeleteUser)
	var user = "default"

	type requestBody struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	router.POST("/register", func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		body := requestBody{}
		decoder := json.NewDecoder(c.Request.Body)
		if err := decoder.Decode(&body); err != nil {
			// some error handling
			return
		}
		defer c.Request.Body.Close()
		test := body.Username + body.Password
		user = test
		println(user)
	})
	router.GET("/", func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Content-Type", "application/json")
		a := make(map[string]string)
		a["password"] = "SomePassword"
		a["username"] = "Tamir"
		j, _ := json.Marshal(a)
		c.Writer.Write(j)
	})
	router.Run("localhost:4000")
}
