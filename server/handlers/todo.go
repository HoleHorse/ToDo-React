package handlers

import (
	"ToDo/database"
	"encoding/json"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ToDo struct {
	Id       primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Title    string             `bson:"title" json:"title"`
	Category string             `bson:"category" json:"category"`
	Text     string             `bson:"text" json:"text"`
	Due      string             `bson:"due" json:"due"`
	State    string             `bson:"state" json:"state"`
	Author   primitive.ObjectID `bson:"author,omitempty" json:"author,omitempty"`
}

func GetToDoList(c *gin.Context, Id primitive.ObjectID) []ToDo {
	todos := database.Client.Database("project").Collection("todos")
	filter := bson.D{{Key: "author", Value: Id}}
	cursor, _ := todos.Find(c, filter)
	var results []ToDo
	for cursor.Next(c) {
		var result ToDo
		err := cursor.Decode(&result)
		if err != nil {
			panic(err)
		}
		results = append(results, result)
	}
	return results
}

func AddToDo(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Writer.Header().Set("Content-Type", "application/json")
	body := ToDo{}
	decoder := json.NewDecoder(c.Request.Body)
	if err := decoder.Decode(&body); err != nil {
		writeResult(c.Writer, "failure")
	}
	defer c.Request.Body.Close()
	body.setDeafults()
	todos := database.Client.Database("project").Collection("todos")
	title := body.Title
	category := body.Category
	text := body.Text
	state := body.State
	date := strings.FieldsFunc(body.Due, split)
	year, _ := strconv.Atoi(date[0])
	month, _ := strconv.Atoi(date[1])
	day, _ := strconv.Atoi(date[2])
	hour, _ := strconv.Atoi(date[3])
	minute, _ := strconv.Atoi(date[4])
	loc := time.Now().Location()
	due := time.Date(year, getMonth(month), day, hour, minute, 0, 0, loc).Format(time.RFC3339)
	due = due[:16]
	_id := primitive.NewObjectID()
	todos.InsertOne(c, ToDo{_id, title, category, text, due, state, body.Author})
	writeResult(c.Writer, "success")
}

func EditToDo(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Writer.Header().Set("Content-Type", "application/json")
	body := ToDo{}
	decoder := json.NewDecoder(c.Request.Body)
	if err := decoder.Decode(&body); err != nil {
		writeResult(c.Writer, err.Error())
		return
	}
	defer c.Request.Body.Close()
	body.setDeafults()
	todos := database.Client.Database("project").Collection("todos")
	_id, _ := primitive.ObjectIDFromHex(c.Param("id"))
	title := body.Title
	category := body.Category
	text := body.Text
	date := strings.FieldsFunc(body.Due, split)
	year, _ := strconv.Atoi(date[0])
	month, _ := strconv.Atoi(date[1])
	day, _ := strconv.Atoi(date[2])
	hour, _ := strconv.Atoi(date[3])
	minute, _ := strconv.Atoi(date[4])
	state := body.State
	loc := time.Now().Location()
	due := time.Date(year, getMonth(month), day, hour, minute, 0, 0, loc).Format(time.RFC3339)
	due = due[:16]
	filter := bson.D{{Key: "_id", Value: _id}}
	update := bson.D{
		{Key: "$set", Value: bson.D{{Key: "title", Value: title}}},
		{Key: "$set", Value: bson.D{{Key: "category", Value: category}}},
		{Key: "$set", Value: bson.D{{Key: "text", Value: text}}},
		{Key: "$set", Value: bson.D{{Key: "due", Value: due}}},
		{Key: "$set", Value: bson.D{{Key: "state", Value: state}}},
	}
	_, err := todos.UpdateOne(c, filter, update)
	if err != nil {
		writeResult(c.Writer, err.Error())
		return
	}
	writeResult(c.Writer, "success")
}

func DeleteToDo(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Writer.Header().Set("Content-Type", "application/json")
	todos := database.Client.Database("project").Collection("todos")
	_id, _ := primitive.ObjectIDFromHex(c.Param("id"))
	filter := bson.D{{Key: "_id", Value: _id}}
	todos.DeleteOne(c, filter)
	writeResult(c.Writer, "success")
}

func GetToDo(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Writer.Header().Set("Content-Type", "application/json")
	Id, _ := primitive.ObjectIDFromHex(c.Param("id"))
	var todos []ToDo = GetToDoList(c, Id)
	j, _ := json.Marshal(todos)
	c.Writer.Write(j)
}

func getMonth(n int) time.Month {
	switch n {
	case 1:
		return time.January
	case 2:
		return time.February
	case 3:
		return time.March
	case 4:
		return time.April
	case 5:
		return time.May
	case 6:
		return time.June
	case 7:
		return time.July
	case 8:
		return time.August
	case 9:
		return time.September
	case 10:
		return time.October
	case 11:
		return time.November
	}
	return time.December
}

func split(r rune) bool {
	return r == ':' || r == '-' || r == 'T'
}

func (todo *ToDo) setDeafults() {
	if todo.Title == "" {
		todo.Title = "Undefined"
	}
	if todo.Category == "" {
		todo.Category = "Undefined"
	}
	if todo.Text == "" {
		todo.Text = "Undefined"
	}
	if todo.Due == "" {
		todo.Due = "Undefined"
	}
	if todo.State == "" {
		todo.State = "Undefined"
	}
}