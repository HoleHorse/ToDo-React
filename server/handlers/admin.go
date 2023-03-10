package handlers

import (
	"ToDo/database"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func GetUsers(c *gin.Context) {
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
	writeResult(c.Writer, results)
}

func DeleteUser(c *gin.Context) {
	users := database.Client.Database("project").Collection("users")
	user := c.Param("user")
	filter := bson.D{{Key: "username", Value: user}}
	_, err := users.DeleteOne(c, filter)
	if err != nil {
		writeResult(c.Writer, err.Error())
		return
	}
	writeResult(c.Writer, "success")
}
