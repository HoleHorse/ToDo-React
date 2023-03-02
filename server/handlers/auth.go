package handlers

import (
	"ToDo/database"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Username  string             `bson:"username,omitempty" json:"username,omitempty"`
	Password  string             `bson:"password,omitempty" json:"password,omitempty"`
	TimeStamp timestamp          `bson:"timestamp,omitempty" json:"timestamp,omitempty"`
	Role      string             `bson:"role,omitempty" json:"role,omitempty"`
}

type timestamp struct {
	Start   time.Time `bson:"start,omitempty" json:"start,omitempty"`
	Last    time.Time `bson:"last,omitempty" json:"last,omitempty"`
	VisitsN int       `bson:"visits_n,omitempty" json:"visits_n,omitempty"`
}

var user User

func Login(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Writer.Header().Set("Content-Type", "application/json")
	body := User{}
	decoder := json.NewDecoder(c.Request.Body)
	if err := decoder.Decode(&body); err != nil {
		panic(err)
	}
	defer c.Request.Body.Close()
	username := body.Username
	password := body.Password
	users := database.Client.Database("project").Collection("users")
	filter := bson.D{{Key: "username", Value: username}}
	var result User
	err := users.FindOne(c, filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.Redirect(http.StatusSeeOther, "/login")
			fmt.Fprint(c.Writer, "err")
			return
		}
		panic(err)
	}
	if !CheckPasswordHash(password, result.Password) {
		c.Redirect(http.StatusSeeOther, "/login")
		fmt.Fprint(c.Writer, "err")
		return
	}
	user = result
	updateTimeStamp(c, users)
	if user.Role == "admin" {
		c.Redirect(http.StatusSeeOther, "/admin")
		return
	}
	writeUser(c.Writer)
}

func Register(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Writer.Header().Set("Content-Type", "application/json")
	body := User{}
	decoder := json.NewDecoder(c.Request.Body)
	if err := decoder.Decode(&body); err != nil {
		panic(err)
	}
	defer c.Request.Body.Close()
	username := body.Username
	password, _ := HashPassword(body.Password)
	project := database.Client.Database("project")
	users := project.Collection("users")
	_id := primitive.NewObjectID()
	_, err := users.InsertOne(c, User{_id, username, password, timestamp{time.Now(), time.Now(), 0}, "user"})
	if err != nil {
		writeResult(c.Writer, "failure")
		return
	}
	writeResult(c.Writer, "success")
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func updateTimeStamp(c *gin.Context, users *mongo.Collection) {
	filter := bson.D{{Key: "_id", Value: user.Id}}
	update := bson.D{
		{Key: "$set", Value: bson.D{{Key: "timestamp.last", Value: time.Now()}}},
		{Key: "$set", Value: bson.D{{Key: "timestamp.visits_n", Value: user.TimeStamp.VisitsN + 1}}},
	}
	users.UpdateOne(c, filter, update)
}

func writeResult(w io.Writer, m string) {
	res := make(map[string]string)
	res["result"] = m
	j, _ := json.Marshal(res)
	w.Write(j)
}

func writeUser(w io.Writer) {
	j, _ := json.Marshal(user)
	w.Write(j)
}
