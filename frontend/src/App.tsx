import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Pages
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

/**
 * App.tsx - Main application router
 * 
 * Routes:
 * - / → LandingPage (public, no auth required)
 * - /signup → SignupPage (public, redirects to dashboard if logged in)
 * - /login → LoginPage (public, redirects to dashboard if logged in)
 * - /dashboard → DashboardPage (protected, requires auth)
 */

// Helper function to check if user is authenticated
const isAuthenticated = (): boolean => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
};

// Protected Route Component
interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!isAuthenticated()) {
          return <Navigate to="/login" replace />;
    }
    return <>{children}</>>;
};

// Public Route Component - redirects to dashboard if already logged in
interface PublicAuthRouteProps {
    children: React.ReactNode;
}

const PublicAuthRoute: React.FC<PublicAuthRouteProps> = ({ children }) => {
    if (isAuthenticated()) {
          return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>>;
};

export default function App() {
    return (
          <Router>
                <Box sx={{ minHeight: '100vh' }}>
                        <Routes>
                          {/* Public Routes */}
                                  <Route path="/" element={<LandingPage />} />
                                  
                          {/* Public Auth Routes - redirect if already logged in */}
                                  <Route 
                                                path="/signup" 
                                    element={
                                                    <PublicAuthRoute>
                                                                    <SignupPage />
                                                    </PublicAuthRoute>PublicAuthRoute>
                                    } 
                                            />
                                            
                                            <Route 
                                                          path="/login" 
                                              element={
                                                              <PublicAuthRoute>
                                                                              <LoginPage />
                                                              </PublicAuthRoute>PublicAuthRoute>
                                              } 
                                                      />
                                                      
                                              {/* Protected Routes */}
                                                      <Route 
                                                                    path="/dashboard" 
                                                        element={
                                                                        <ProtectedRoute>
                                                                                        <DashboardPage />
                                                                        </ProtectedRoute>ProtectedRoute>
                                                        } 
                                                                />
                                                                
                                                        {/* Catch-all - redirect to landing page */}
                                                                <Route path="*" element={<Navigate to="/" replace />} />
                                                      </Route>Routes>
                                            </Route>Box>
                                  </Route>Router>
                          );
                          }</></>
