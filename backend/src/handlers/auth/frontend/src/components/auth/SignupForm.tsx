'use client';

import React, { useState } from 'react';
import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    Link,
    Snackbar,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    LinearProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema
const SignupSchema = z
  .object({
        email: z.string().email('Invalid email format'),
        password: z
          .string()
          .min(8, 'Password must be at least 8 characters')
          .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
          .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
          .regex(/[0-9]/, 'Password must contain at least one number'),
        confirmPassword: z.string(),
        username: z
          .string()
          .min(3, 'Username must be at least 3 characters')
          .max(20, 'Username must be at most 20 characters')
          .regex(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric with underscores only'),
        displayName: z
          .string()
          .min(1, 'Display name is required')
          .max(50, 'Display name must be at most 50 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof SignupSchema>;

interface SignupResponse {
    success: boolean;
    userId?: string;
    message: string;
}

/**
 * Signup form component with Material-UI
 * Validates user input and calls signup API
 */
export const SignupForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {
          control,
          handleSubmit,
          formState: { errors },
          watch,
          reset,
    } = useForm<SignupFormData>({
          resolver: zodResolver(SignupSchema),
          mode: 'onChange',
    });

    const password = watch('password');

    const getPasswordStrength = (): { strength: number; color: 'error' | 'warning' | 'success' } => {
          if (!password) return { strength: 0, color: 'error' };
          let strength = 0;
          if (password.length >= 8) strength += 1;
          if (password.length >= 12) strength += 1;
          if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) strength += 1;
          if (/[!@#$%^&*]/.test(password)) strength += 1;
          return {
                  strength: Math.min(strength * 25, 100),
                  color: strength <= 1 ? 'error' : strength <= 2 ? 'warning' : 'success',
          };
    };

    const passwordStrength = getPasswordStrength();

    const onSubmit = async (data: SignupFormData) => {
          setLoading(true);
          setErrorMessage('');
          setSuccessMessage('');

          try {
                  const response = await fetch('/api/auth/signup', {
                            method: 'POST',
                            headers: {
                                        'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                        email: data.email,
                                        password: data.password,
                                        username: data.username,
                                        displayName: data.displayName,
                            }),
                  });

            const result: SignupResponse = await response.json();

            if (!response.ok) {
                      throw new Error(result.message || 'Signup failed');
            }

            setSuccessMessage('Account created successfully! Please check your email.');
                  reset();
                  // Redirect to login or home page after success
            setTimeout(() => {
                      window.location.href = '/login';
            }, 2000);
          } catch (error) {
                  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
                  setErrorMessage(message);
          } finally {
                  setLoading(false);
          }
    };

    const handleTogglePasswordVisibility = () => {
          setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
          setShowConfirmPassword(!showConfirmPassword);
    };

    return (
          <Box
                  sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '100vh',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: 2,
                  }}
                >
                <Card
                          sx={{
                                      width: '100%',
                                      maxWidth: 500,
                                      padding: 4,
                                      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                          }}
                        >
                        <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                                  marginBottom: 1,
                                                  fontWeight: 700,
                                                  textAlign: 'center',
                                                  color: '#333',
                                    }}
                                  >
                                  Join My-Travel-Agent
                        </Typography>Typography>
                        <Typography
                                    variant="body2"
                                    sx={{
                                                  textAlign: 'center',
                                                  color: '#666',
                                                  marginBottom: 3,
                                    }}
                                  >
                                  Create an account to start planning your adventures
                        </Typography>Typography>
                
                        <form onSubmit={handleSubmit(onSubmit)}>
                          {/* Email Field */}
                                  <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                                <TextField
                                                                  {...field}
                                                                                  fullWidth
                                                                                  label="Email Address"
                                                                                  type="email"
                                                                                  variant="outlined"
                                                                                  margin="normal"
                                                                                  error={!!errors.email}
                                                                                  helperText={errors.email?.message}
                                                                                  disabled={loading}
                                                                                />
                                                              )}
                                              />
                        
                          {/* Username Field */}
                                  <Controller
                                                name="username"
                                                control={control}
                                                render={({ field }) => (
                                                                <TextField
                                                                  {...field}
                                                                                  fullWidth
                                                                                  label="Username"
                                                                                  variant="outlined"
                                                                                  margin="normal"
                                                                                  error={!!errors.username}
                                                                                  helperText={errors.username?.message || 'Alphanumeric with underscores (3-20 chars)'}
                                                                                  disabled={loading}
                                                                                />
                                                              )}
                                              />
                        
                          {/* Display Name Field */}
                                  <Controller
                                                name="displayName"
                                                control={control}
                                                render={({ field }) => (
                                                                <TextField
                                                                  {...field}
                                                                                  fullWidth
                                                                                  label="Display Name"
                                                                                  variant="outlined"
                                                                                  margin="normal"
                                                                                  error={!!errors.displayName}
                                                                                  helperText={errors.displayName?.message}
                                                                                  disabled={loading}
                                                                                />
                                                              )}
                                              />
                        
                          {/* Password Field */}
                                  <Controller
                                                name="password"
                                                control={control}
                                                render={({ field }) => (
                                                                <TextField
                                                                  {...field}
                                                                                  fullWidth
                                                                                  label="Password"
                                                                                  type={showPassword ? 'text' : 'password'}
                                                                                  variant="outlined"
                                                                                  margin="normal"
                                                                                  error={!!errors.password}
                                                                                  helperText={errors.password?.message}
                                                                                  disabled={loading}
                                                                                  InputProps={{
                                                                                                      endAdornment: (
                                                                                                                            <InputAdornment position="end">
                                                                                                                                                  <IconButton
                                                                                                                                                                            onClick={handleTogglePasswordVisibility}
                                                                                                                                                                            edge="end"
                                                                                                                                                                            disabled={loading}
                                                                                                                                                                          >
                                                                                                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                                                                                                    </IconButton>IconButton>
                                                                                                                              </InputAdornment>InputAdornment>
                                                                                                                          ),
                                                                                  }}
                                                                                />
                                                              )}
                                              />
                        
                          {/* Password Strength Indicator */}
                          {password && (
                                      <Box sx={{ marginY: 1 }}>
                                                    <LinearProgress
                                                                      variant="determinate"
                                                                      value={passwordStrength.strength}
                                                                      color={passwordStrength.color}
                                                                    />
                                                    <Typography variant="caption" color={passwordStrength.color}>
                                                      {passwordStrength.strength < 50
                                                                          ? 'Weak'
                                                                          : passwordStrength.strength < 75
                                                                          ? 'Moderate'
                                                                          : 'Strong'}{' '}
                                                                    password
                                                    </Typography>Typography>
                                      </Box>Box>
                                  )}
                        
                          {/* Confirm Password Field */}
                                  <Controller
                                                name="confirmPassword"
                                                control={control}
                                                render={({ field }) => (
                                                                <TextField
                                                                  {...field}
                                                                                  fullWidth
                                                                                  label="Confirm Password"
                                                                                  type={showConfirmPassword ? 'text' : 'password'}
                                                                                  variant="outlined"
                                                                                  margin="normal"
                                                                                  error={!!errors.confirmPassword}
                                                                                  helperText={errors.confirmPassword?.message}
                                                                                  disabled={loading}
                                                                                  InputProps={{
                                                                                                      endAdornment: (
                                                                                                                            <InputAdornment position="end">
                                                                                                                                                  <IconButton
                                                                                                                                                                            onClick={handleToggleConfirmPasswordVisibility}
                                                                                                                                                                            edge="end"
                                                                                                                                                                            disabled={loading}
                                                                                                                                                                          >
                                                                                                                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                                                                                                                    </IconButton>IconButton>
                                                                                                                              </InputAdornment>InputAdornment>
                                                                                                                          ),
                                                                                  }}
                                                                                />
                                                              )}
                                              />
                        
                          {/* Password Requirements */}
                                  <Typography variant="caption" sx={{ display: 'block', marginTop: 2, color: '#666' }}>
                                              Password must contain:
                                              <ul style={{ margin: '4px 0', paddingLeft: 20 }}>
                                                            <li>At least 8 characters</li>li>
                                                            <li>One uppercase letter</li>li>
                                                            <li>One lowercase letter</li>li>
                                                            <li>One number</li>li>
                                              </ul>ul>
                                  </Typography>Typography>
                        
                          {/* Submit Button */}
                                  <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                                marginTop: 3,
                                                                padding: '12px 0',
                                                                fontSize: '1rem',
                                                                fontWeight: 600,
                                                }}
                                                disabled={loading}
                                                endIcon={loading ? <CircularProgress size={24} /> : undefined}
                                              >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                  </Button>Button>
                        
                          {/* Login Link */}
                                  <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                                              <Typography variant="body2">
                                                            Already have an account?{' '}
                                                            <Link href="/login" sx={{ fontWeight: 600, cursor: 'pointer' }}>
                                                                            Login here
                                                            </Link>Link>
                                              </Typography>Typography>
                                  </Box>Box>
                        </form>form>
                </Card>Card>
          
            {/* Success Snackbar */}
                <Snackbar
                          open={!!successMessage}
                          autoHideDuration={6000}
                          onClose={() => setSuccessMessage('')}
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
                          {successMessage}
                        </Alert>Alert>
                </Snackbar>Snackbar>
          
            {/* Error Snackbar */}
                <Snackbar
                          open={!!errorMessage}
                          autoHideDuration={6000}
                          onClose={() => setErrorMessage('')}
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
                          {errorMessage}
                        </Alert>Alert>
                </Snackbar>Snackbar>
          </Box>Box>
        );
};

export default SignupForm;</Box>
