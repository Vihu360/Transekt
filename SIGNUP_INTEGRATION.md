# Signup Integration Documentation

## Overview
The signup functionality has been fully integrated with API calls, Zod validation, and cookie management. Users will be redirected to `/app/overview` after successful signup.

## Features Implemented

### 1. API Utilities (`src/utils/api.ts`)
- Generic API client with TypeScript support
- Authentication API functions (signup, login, logout)
- User API functions (profile management)
- Automatic cookie management for user sessions
- Error handling and response typing

### 2. Zod Validation (`src/utils/validation.ts`)
- Comprehensive form validation schemas
- Real-time validation with error messages
- Password strength requirements
- Terms acceptance validation
- Type-safe validation functions

### 3. Enhanced Signup Page (`src/app/auth/signup/page.tsx`)
- Multi-step form with validation at each step
- Real-time error display
- Loading states and API error handling
- Automatic redirection after successful signup
- Form validation before API calls

### 4. Overview Page (`src/app/overview/page.tsx`)
- Welcome page for new users
- User information display
- Quick start action cards
- Logout functionality
- Protected route (requires authentication)

## Configuration

### Environment Variables
Create a `.env.local` file in your project root:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Example for production:
# NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

### API Endpoint
The signup API expects a POST request to `/v1/users/` with the following payload:

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword123"
}
```

## API Response
The API should return the same data structure:

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword123"
}
```

## Cookie Management
- User data is stored in cookies for 7 days
- Authentication status is tracked
- Automatic cleanup on logout

## Validation Rules

### Form Validation
- **First Name**: Required, 2-50 characters, letters and spaces only
- **Last Name**: Required, 2-50 characters, letters and spaces only
- **Email**: Required, valid email format, max 100 characters
- **Password**: Required, minimum 8 characters, must contain uppercase, lowercase, and number
- **Confirm Password**: Must match password
- **Company Name**: Optional, max 100 characters
- **Terms**: Must be accepted
- **Marketing**: Optional

### API Validation
- Email format validation
- Name required (minimum 1 character)
- Password minimum 8 characters

## Error Handling
- Form validation errors displayed inline
- API errors displayed at the top of the form
- Loading states during API calls
- Graceful error handling with user-friendly messages

## Security Features
- Password strength requirements
- Input sanitization
- Secure cookie storage
- CSRF protection through proper form handling

## Usage Flow
1. User fills out multi-step signup form
2. Each step validates input before proceeding
3. Final submission validates entire form with Zod
4. API call made to backend with validated data
5. User data stored in cookies on success
6. User redirected to overview page
7. Overview page displays user information and quick start options

## Dependencies Added
- `js-cookie`: Cookie management
- `@types/js-cookie`: TypeScript types for js-cookie
- `zod`: Schema validation

## Testing
To test the integration:

1. Start your backend API server
2. Set the correct `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
3. Navigate to `/auth/signup`
4. Fill out the form and submit
5. Verify successful redirection to `/overview`
6. Check cookies for stored user data

## Troubleshooting

### Common Issues
1. **API Connection Error**: Check `NEXT_PUBLIC_API_BASE_URL` configuration
2. **Validation Errors**: Ensure all required fields are filled correctly
3. **Cookie Issues**: Check browser cookie settings and CORS configuration
4. **Redirect Issues**: Verify the overview page exists at `/app/overview/page.tsx`

### Debug Mode
Enable console logging by adding `console.log` statements in the API functions or checking browser network tab for API calls.
