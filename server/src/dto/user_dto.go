package dto

type CreateUserDTO struct {
	Username string `json:"username" validate:"required,min=3,max=30"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`
}

type CreateUserWithGoogleDTO struct {
	Username string `json:"username" validate:"required,min=3,max=30"`
	GoogleID string `json:"googleId" validate:"required"`
}

type CreateUserResponseDTO struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

type LoginRequestDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type GoogleLoginRequestDTO struct {
	IDtoken string `json:"idToken"`
}
