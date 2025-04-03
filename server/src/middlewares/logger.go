package middlewares

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

// LoggerConfig allows customization of the logger format
type LoggerConfig struct {
	UseJSON    bool // Toggle JSON or text logs
	WithCaller bool // Include caller info
}

func CustomLoggerMiddleware(config LoggerConfig) echo.MiddlewareFunc {
	// Set logging format based on config
	if config.UseJSON {
		zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	} else {
		// Disable ANSI escape codes (fixes raw escape code output)
		log.Logger = log.Output(zerolog.ConsoleWriter{
			Out:        os.Stdout,
			NoColor:    true, // 🚀 Fix: Disable escape codes
			TimeFormat: "2006-01-02 15:04:05",
		})
	}

	return middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:          true,
		LogStatus:       true,
		LogMethod:       true,
		LogLatency:      true,
		LogRemoteIP:     true,
		LogUserAgent:    true,
		LogRequestID:    true,
		LogError:        true,
		LogResponseSize: true,
		LogValuesFunc: func(c echo.Context, values middleware.RequestLoggerValues) error {
			event := log.Info().
				Str("URI", values.URI).
				Int("Status", values.Status).
				Str("Method", values.Method).
				Dur("Latency", values.Latency).
				Str("RemoteIP", values.RemoteIP).
				Str("UserAgent", values.UserAgent).
				Int64("ResponseSize", values.ResponseSize).
				Str("RequestID", values.RequestID)

			if values.Error != nil {
				event.Err(values.Error)
			}

			if config.WithCaller {
				event.Caller()
			}

			event.Msg("HTTP Request")

			return nil
		},
	})
}
