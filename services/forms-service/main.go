package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Config struct {
	Port string
}

type App struct {
	config *Config
	router *gin.Engine
}

func main() {
	// Load environment variables
	godotenv.Load()

	// Initialize config
	config := &Config{
		Port: getEnv("PORT", "8001"),
	}

	// Initialize app
	app := &App{
		config: config,
		router: gin.Default(),
	}

	// Setup routes
	app.setupRoutes()

	// Start server
	log.Printf("🚀 Forms Service starting on port %s", config.Port)
	if err := app.router.Run(":" + config.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func (app *App) setupRoutes() {
	// Health check
	app.router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "forms-service",
		})
	})

	// Google Forms integration
	app.router.POST("/connect/google", app.connectGoogleForm)
	app.router.GET("/forms", app.listForms)
	app.router.GET("/forms/:formId/responses", app.getFormResponses)
	app.router.POST("/sync/:formId", app.syncFormResponses)
}

func (app *App) connectGoogleForm(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Google Forms OAuth integration - Coming soon",
		"status":  "pending",
	})
}

func (app *App) listForms(c *gin.Context) {
	// Mock data
	c.JSON(http.StatusOK, gin.H{
		"forms": []gin.H{
			{
				"id":          "mock-form-1",
				"title":       "Software Engineer Applications 2024",
				"platform":    "Google Forms",
				"submissions": 247,
				"lastSync":    "2 minutes ago",
			},
			{
				"id":          "mock-form-2",
				"title":       "Marketing Intern Screening",
				"platform":    "Google Forms",
				"submissions": 89,
				"lastSync":    "1 hour ago",
			},
		},
	})
}

func (app *App) getFormResponses(c *gin.Context) {
	formID := c.Param("formId")

	log.Printf("Fetching responses for form: %s", formID)

	// Mock responses
	c.JSON(http.StatusOK, gin.H{
		"form_id": formID,
		"responses": []gin.H{
			{
				"id":              "resp-1",
				"name":            "John Doe",
				"email":           "john@example.com",
				"submittedAt":     "2024-12-14 10:30 AM",
				"plagiarismScore": 5,
				"aiScore":         12,
				"qualityScore":    92,
			},
			{
				"id":              "resp-2",
				"name":            "Jane Smith",
				"email":           "jane@example.com",
				"submittedAt":     "2024-12-14 11:15 AM",
				"plagiarismScore": 78,
				"aiScore":         85,
				"qualityScore":    45,
			},
		},
		"count": 2,
	})
}

func (app *App) syncFormResponses(c *gin.Context) {
	formID := c.Param("formId")

	log.Printf("Syncing responses for form: %s", formID)

	c.JSON(http.StatusAccepted, gin.H{
		"message": "Sync started",
		"form_id": formID,
		"status":  "processing",
	})
}

// Helper function to get environment variable with default
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
