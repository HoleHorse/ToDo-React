package handlers

import (
	"ToDo/database"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func getUsers(c *gin.Context) []User {
	users := database.Client.Database("project").Collection("users")
	filter := bson.D{}
	cursor, _ := users.Find(c, filter)
	var results []User
	for cursor.Next(c) {
		var result User
		err := cursor.Decode(&result)
		if err != nil {
			panic(err)
		}
		results = append(results, result)
	}
	return results
}

func DeleteUser(c *gin.Context) {
	users := database.Client.Database("project").Collection("users")
	user := c.Param("user")
	filter := bson.D{{Key: "username", Value: user}}
	users.DeleteOne(c, filter)
	c.Redirect(http.StatusSeeOther, "/admin")
}
