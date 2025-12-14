package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/forms/v1"
	"google.golang.org/api/option"
)

// Config holds application configuration
type Config struct {
	Port               string
	DatabaseURL        string
	RedisURL           string
	RabbitMQURL        string
	GoogleClientID     string
	GoogleClientSecret string
	GoogleRedirectURL  string
}

// App holds application dependencies
type App struct {
	config      *Config
	router      *gin.Engine
	googleOAuth *oauth2.Config
}

func main() {
	// Load environment variables
	godotenv.Load()

	// Initialize config
	config := &Config{
		Port:               getEnv("PORT", "8001"),
		DatabaseURL:        getEnv("DATABASE_URL", ""),
		RedisURL:           getEnv("REDIS_URL", ""),
		RabbitMQURL:        getEnv("RABBITMQ_URL", ""),
		GoogleClientID:     getEnv("GOOGLE_CLIENT_ID", ""),
		GoogleClientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),
		GoogleRedirectURL:  getEnv("GOOGLE_REDIRECT_URL", "http://localhost:8001/callback/google"),
	}

	// Initialize app
	app := &App{
		config: config,
		router: gin.Default(),
	}

	// Setup Google OAuth
	app.googleOAuth = &oauth2.Config{
		ClientID:     config.GoogleClientID,
		ClientSecret: config.GoogleClientSecret,
		RedirectURL:  config.GoogleRedirectURL,
		Scopes: []string{
			"https://www.googleapis.com/auth/forms.body.readonly",
			"https://www.googleapis.com/auth/forms.responses.readonly",
		},
		Endpoint: google.Endpoint,
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
	app.router.GET("/callback/google", app.googleOAuthCallback)
	app.router.GET("/forms", app.listForms)
	app.router.GET("/forms/:formId/responses", app.getFormResponses)
	app.router.POST("/sync/:formId", app.syncFormResponses)

	// Microsoft Forms integration (TODO)
	app.router.POST("/connect/microsoft", app.connectMicrosoftForm)
}

// connectGoogleForm initiates Google OAuth flow
func (app *App) connectGoogleForm(c *gin.Context) {
	// Generate OAuth URL
	url := app.googleOAuth.AuthCodeURL("state-token", oauth2.AccessTypeOffline)

	c.JSON(http.StatusOK, gin.H{
		"auth_url": url,
		"message":  "Please visit the URL to authorize access",
	})
}

// googleOAuthCallback handles the OAuth callback
func (app *App) googleOAuthCallback(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No authorization code provided"})
		return
	}

	// Exchange code for token
	token, err := app.googleOAuth.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("Error exchanging code: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange authorization code"})
		return
	}

	// TODO: Store token in database associated with user

	c.JSON(http.StatusOK, gin.H{
		"message":      "Successfully connected Google Forms",
		"access_token": token.AccessToken,
		"expires_at":   token.Expiry,
	})
}

// listForms lists all Google Forms for the authenticated user
func (app *App) listForms(c *gin.Context) {
	// TODO: Get user's access token from database
	// For now, return mock data

	c.JSON(http.StatusOK, gin.H{
		"forms": []gin.H{
			{
				"id":    "mock-form-1",
				"title": "Job Application Form",
				"url":   "https://forms.google.com/...",
			},
		},
	})
}

// getFormResponses fetches responses for a specific form
func (app *App) getFormResponses(c *gin.Context) {
	formID := c.Param("formId")

	// TODO: Get user's access token from database
	// For now, return mock data

	log.Printf("Fetching responses for form: %s", formID)

	c.JSON(http.StatusOK, gin.H{
		"form_id":   formID,
		"responses": []gin.H{},
		"count":     0,
	})
}

// syncFormResponses syncs responses from Google Forms to database
func (app *App) syncFormResponses(c *gin.Context) {
	formID := c.Param("formId")

	// TODO: Implement actual sync logic
	// 1. Fetch responses from Google Forms API
	// 2. Parse and store in database
	// 3. Publish to RabbitMQ for processing (plagiarism, AI detection)

	log.Printf("Syncing responses for form: %s", formID)

	// Mock implementation
	go func() {
		// Simulate async processing
		time.Sleep(2 * time.Second)
		log.Printf("Sync completed for form: %s", formID)
	}()

	c.JSON(http.StatusAccepted, gin.H{
		"message": "Sync started",
		"form_id": formID,
	})
}

// connectMicrosoftForm handles Microsoft Forms connection
func (app *App) connectMicrosoftForm(c *gin.Context) {
	// TODO: Implement Microsoft OAuth flow
	c.JSON(http.StatusNotImplemented, gin.H{
		"message": "Microsoft Forms integration coming soon",
	})
}

// fetchGoogleFormResponses fetches responses using Google Forms API
func (app *App) fetchGoogleFormResponses(formID string, accessToken string) ([]interface{}, error) {
	ctx := context.Background()

	// Create Forms service client
	formsService, err := forms.NewService(ctx, option.WithAPIKey(accessToken))
	if err != nil {
		return nil, err
	}

	// Get form responses
	resp, err := formsService.Forms.Responses.List(formID).Do()
	if err != nil {
		return nil, err
	}

	// Convert to generic interface for easier handling
	responses := make([]interface{}, len(resp.Responses))
	for i, r := range resp.Responses {
		responses[i] = r
	}

	return responses, nil
}

// Helper function to get environment variable with default
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
