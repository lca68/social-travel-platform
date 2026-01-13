'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress,
    Alert,
    Link,
    InputAdornment,
    IconButton,
    Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Zod validation schema
const loginSchema = z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

  const {
        control,
        handleSubmit,
        formState: { errors },
  } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
                email: '',
                password: '',
        },
  });

  const onSubmit = async (data: LoginFormInputs) => {
        try {
                setLoading(true);
                setError(null);

          const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                                'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                                email: data.email,
                                password: data.password,
                    }),
          });

          const result = await response.json();

          if (!response.ok) {
                    if (response.status === 401) {
                                setError('Invalid email or password. Please try again.');
                    } else if (response.status === 403) {
                                setError('Your account is not confirmed. Please check your email.');
                    } else {
                                setError(result.message || 'Login failed. Please try again.');
                    }
                    return;
          }

          // Store tokens in localStorage
          localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('idToken', result.idToken);
                localStorage.setItem('refreshToken', result.refreshToken);

          // Redirect to dashboard
          router.push('/dashboard');
        } catch (err) {
                setError('An error occurred. Please try again later.');
                console.error('Login error:', err);
        } finally {
                setLoading(false);
        }
  };

  return (
        <Container maxWidth="sm">
              <Box
                        sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '100vh',
                                    py: 3,
                        }}
                      >
                      <Paper
                                  elevation={3}
                                  sx={{
                                                p: 4,
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 3,
                                  }}
                                >
                                <Box sx={{ textAlign: 'center' }}>
                                            <Typography
                                                            variant="h4"
                                                            component="h1"
                                                            gutterBottom
                                                            sx={{ fontWeight: 700, mb: 1 }}
                                                          >
                                                          Welcome Back
                                            </Typography>Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                          Sign in to your travel planning account
                                            </Typography>Typography>
                                </Box>Box>
                      
                        {error && <Alert severity="error">{error}</Alert>Alert>}
                      
                                <form onSubmit={handleSubmit(onSubmit)}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                              {/* Email Field */}
                                                          <Controller
                                                                            name="email"
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                                <TextField
                                                                                                  {...field}
                                                                                                                      label="Email Address"
                                                                                                                      type="email"
                                                                                                                      fullWidth
                                                                                                                      error={!!errors.email}
                                                                                                                      helperText={errors.email?.message}
                                                                                                                      placeholder="you@example.com"
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
                                                                                                                      label="Password"
                                                                                                                      type={showPassword ? 'text' : 'password'}
                                                                                                                      fullWidth
                                                                                                                      error={!!errors.password}
                                                                                                                      helperText={errors.password?.message}
                                                                                                                      disabled={loading}
                                                                                                                      InputProps={{
                                                                                                                                              endAdornment: (
                                                                                                                                                                        <InputAdornment position="end">
                                                                                                                                                                                                  <IconButton
                                                                                                                                                                                                                                aria-label="toggle password visibility"
                                                                                                                                                                                                                                onClick={() => setShowPassword(!showPassword)}
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
                                            
                                              {/* Sign In Button */}
                                                          <Button
                                                                            type="submit"
                                                                            fullWidth
                                                                            variant="contained"
                                                                            size="large"
                                                                            disabled={loading}
                                                                            sx={{ mt: 2 }}
                                                                          >
                                                            {loading ? (
                                                                                              <>
                                                                                                                  <CircularProgress size={20} sx={{ mr: 1 }} />
                                                                                                                  Signing in...
                                                                                                </>>
                                                                                            ) : (
                                                                                              'Sign In'
                                                                                            )}
                                                          </Button>Button>
                                            
                                              {/* Forgot Password Link */}
                                                          <Box sx={{ textAlign: 'center' }}>
                                                                          <Link
                                                                                              href="/auth/forgot-password"
                                                                                              underline="hover"
                                                                                              sx={{
                                                                                                                    color: 'primary.main',
                                                                                                                    cursor: 'pointer',
                                                                                                                    fontSize: '0.875rem',
                                                                                                }}
                                                                                            >
                                                                                            Forgot your password?
                                                                          </Link>Link>
                                                          </Box>Box>
                                            
                                              {/* Sign Up Link */}
                                                          <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid #e0e0e0' }}>
                                                                          <Typography variant="body2" color="text.secondary">
                                                                                            Don't have an account?{' '}
                                                                                            <Link
                                                                                                                  href="/auth/signup"
                                                                                                                  underline="hover"
                                                                                                                  sx={{
                                                                                                                                          color: 'primary.main',
                                                                                                                                          cursor: 'pointer',
                                                                                                                                          fontWeight: 500,
                                                                                                                    }}
                                                                                                                >
                                                                                                                Sign up here
                                                                                              </Link>Link>
                                                                          </Typography>Typography>
                                                          </Box>Box>
                                            </Box>Box>
                                </form>form>
                      </Paper>Paper>
              </Box>Box>
        </Container>Container>
      );
}</></Container>
