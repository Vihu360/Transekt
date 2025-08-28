import { z } from 'zod';

// Signup form validation schema
export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  
  companyName: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),
  
  acceptMarketing: z
    .boolean()
    .default(false),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// API signup request schema (for sending to backend)
export const apiSignupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
});

// Type inference from schemas
export type SignupFormData = z.infer<typeof signupSchema>;
export type ApiSignupRequest = z.infer<typeof apiSignupSchema>;

// Validation helper functions
export const validateSignupForm = (data: unknown): SignupFormData => {
  return signupSchema.parse(data);
};

export const validateApiSignup = (data: unknown): ApiSignupRequest => {
  return apiSignupSchema.parse(data);
};

// Safe validation (returns errors instead of throwing)
export const safeValidateSignupForm = (data: unknown) => {
  return signupSchema.safeParse(data);
};

export const safeValidateApiSignup = (data: unknown) => {
  return apiSignupSchema.safeParse(data);
};
