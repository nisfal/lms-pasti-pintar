package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type TryoutRecord struct {
	UserID         string    `bson:"userId" json:"userId"`
	TryoutID       string    `bson:"tryoutId" json:"tryoutId"`
	TryoutTitle    string    `bson:"tryoutTitle" json:"tryoutTitle"`
	Category       string    `bson:"category" json:"category"`
	TotalQuestions int       `bson:"totalQuestions" json:"totalQuestions"`
	CorrectAnswers int       `bson:"correctAnswers" json:"correctAnswers"`
	Score          int       `bson:"score" json:"score"`
	TakenAt        time.Time `bson:"takenAt" json:"takenAt"`
}

type CategoryAccuracy struct {
	Category string  `json:"category"`
	Accuracy float64 `json:"accuracy"`
	Correct  int     `json:"correct"`
	Total    int     `json:"total"`
}

type AccuracyData struct {
	UserID             string             `json:"userId"`
	TotalTryouts       int                `json:"totalTryouts"`
	TotalQuestions     int                `json:"totalQuestions"`
	TotalCorrect       int                `json:"totalCorrect"`
	AccuracyPercentage float64            `json:"accuracyPercentage"`
	LatestScore        int                `json:"latestScore"`
	Categories         []CategoryAccuracy `json:"categories"`
}

type AccuracyResponse struct {
	Status string       `json:"status"`
	Data   AccuracyData `json:"data"`
}

var mongoClient *mongo.Client
var dbName string

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "ok",
		"message": "Scoring Service is running",
	})
}

func accuracyHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	// URL format: /api/accuracy/{userId}
	parts := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
	if len(parts) < 3 || parts[2] == "" {
		http.Error(w, `{"status":"error","message":"User ID is required"}`, http.StatusBadRequest)
		return
	}
	userID := parts[2]

	coll := mongoClient.Database(dbName).Collection("tryoutrecords")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	findOptions := options.Find().SetSort(bson.D{{Key: "takenAt", Value: -1}})
	cursor, err := coll.Find(ctx, bson.M{"userId": userID}, findOptions)
	if err != nil {
		log.Printf("Error querying tryout records: %v\v", err)
		http.Error(w, `{"status":"error","message":"Failed to query database"}`, http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var records []TryoutRecord
	if err := cursor.All(ctx, &records); err != nil {
		log.Printf("Error decoding records: %v\n", err)
		http.Error(w, `{"status":"error","message":"Failed to decode records"}`, http.StatusInternalServerError)
		return
	}

	totalQuestions := 0
	totalCorrect := 0
	latestScore := 0
	catMap := make(map[string]*CategoryAccuracy)

	if len(records) > 0 {
		latestScore = records[0].Score
	}

	for _, rec := range records {
		totalQuestions += rec.TotalQuestions
		totalCorrect += rec.CorrectAnswers

		if _, exists := catMap[rec.Category]; !exists {
			catMap[rec.Category] = &CategoryAccuracy{
				Category: rec.Category,
				Correct:  0,
				Total:    0,
			}
		}
		catMap[rec.Category].Correct += rec.CorrectAnswers
		catMap[rec.Category].Total += rec.TotalQuestions
	}

	overallAccuracy := 0.0
	if totalQuestions > 0 {
		overallAccuracy = math.Round((float64(totalCorrect)/float64(totalQuestions))*1000) / 10
	}

	var categories []CategoryAccuracy
	for _, cat := range catMap {
		catAcc := 0.0
		if cat.Total > 0 {
			catAcc = math.Round((float64(cat.Correct)/float64(cat.Total))*1000) / 10
		}
		cat.Accuracy = catAcc
		categories = append(categories, *cat)
	}

	res := AccuracyResponse{
		Status: "success",
		Data: AccuracyData{
			UserID:             userID,
			TotalTryouts:       len(records),
			TotalQuestions:     totalQuestions,
			TotalCorrect:       totalCorrect,
			AccuracyPercentage: overallAccuracy,
			LatestScore:        latestScore,
			Categories:         categories,
		},
	}

	json.NewEncoder(w).Encode(res)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	dbName = os.Getenv("MONGODB_DATABASE")
	if dbName == "" {
		dbName = "lms_pasti_pintar"
	}

	var err error
	mongoClient, err = mongo.Connect(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Ping mongo
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	if err := mongoClient.Ping(ctx, nil); err != nil {
		log.Fatalf("MongoDB ping failed: %v", err)
	}
	fmt.Println("MongoDB connected successfully in Scoring Service")

	http.HandleFunc("/api/health", healthHandler)
	http.HandleFunc("/api/accuracy/", accuracyHandler)

	fmt.Printf("Scoring Service running on port %s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
