'use client';

import React from 'react';
import { Box, Container } from '@mui/material';

// Landing page section components - these will be created in subsequent steps
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ProblemSection from '../components/landing/ProblemSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import SocialProofSection from '../components/landing/SocialProofSection';
import ComparisonSection from '../components/landing/ComparisonSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

/**
 * Landing Page Component
 * 
 * This is the main marketing landing page for My-Travel-Agent.
 * All CTA buttons link to /signup for user registration.
 * 
 * Section IDs for smooth scrolling:
 * - hero: Hero section with main CTA
 * - problem: Problem statement section
 * - features: Features showcase section
 * - how-it-works: How the app works section
 * - social-proof: Social proof and trust indicators
 * - comparison: Competitor comparison section
 * - cta: Final call-to-action section
 */
export default function LandingPage() {
    return (
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navigation Bar */}
                  <Navbar />

            {/* Main Content */}
                  <Box component="main" sx={{ flex: 1 }}>
                    {/* Hero Section */}
                            <Box id="hero">
                                      <HeroSection />
                            </Box>Box>
                  
                    {/* Problem Section */}
                          <Box id="problem">
                                    <ProblemSection />
                          </Box>Box>
                  
                    {/* Features Section */}
                          <Box id="features">
                                    <FeaturesSection />
                          </Box>Box>
                  
                    {/* How It Works Section */}
                          <Box id="how-it-works">
                                    <HowItWorksSection />
                          </Box>Box>
                  
                    {/* Social Proof Section */}
                          <Box id="social-proof">
                                    <SocialProofSection />
                          </Box>Box>
                  
                    {/* Comparison Section */}
                          <Box id="comparison">
                                    <ComparisonSection />
                          </Box>Box>
                  
                    {/* Final CTA Section */}
                          <Box id="cta">
                                    <CTASection />
                          </Box>Box>
                  </Box>Box>
          
            {/* Footer */}
                <Footer />
          </Box>Box>
        );
}</Box>
