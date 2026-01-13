import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CTASection: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const benefits = [
          'Access personalized travel recommendations',
          'Connect with verified travelers worldwide',
          'Plan trips with smart tools',
          'Share experiences and earn badges',
          'Get real-time travel updates',
          'Build your travel network',
        ];

    return (
          <Box
                  id="cta"
                  sx={{
                            py: { xs: 8, md: 12 },
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            position: 'relative',
                            overflow: 'hidden',
                            '&:before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)',
                                        pointerEvents: 'none',
                            },
                  }}
                >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        <Grid container spacing={4} alignItems="center">
                                  <Grid item xs={12} md={6}>
                                              <Typography
                                                              variant="h2"
                                                              sx={{
                                                                                fontSize: { xs: '2rem', md: '2.8rem' },
                                                                                fontWeight: 'bold',
                                                                                color: 'white',
                                                                                mb: 2,
                                                                                lineHeight: 1.2,
                                                              }}
                                                            >
                                                            Start Your Travel Community Journey Today
                                              </Typography>Typography>
                                              <Typography
                                                              variant="h6"
                                                              sx={{
                                                                                fontSize: { xs: '1rem', md: '1.1rem' },
                                                                                color: 'rgba(255, 255, 255, 0.9)',
                                                                                mb: 3,
                                                                                lineHeight: 1.6,
                                                              }}
                                                            >
                                                            Join thousands of travelers creating authentic experiences and building meaningful connections around the world.
                                              </Typography>Typography>
                                  
                                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                                                {benefits.slice(0, 3).map((benefit, index) => (
                                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <CheckCircleIcon sx={{ color: 'white', fontSize: '1.5rem', flexShrink: 0 }} />
                                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '0.95rem' }}>
                                                      {benefit}
                                                    </Typography>Typography>
                                  </Box>Box>
                                ))}
                                              </Box>Box>
                                  
                                              <Button
                                                              variant="contained"
                                                              size="large"
                                                              onClick={() => navigate('/signup')}
                                                              endIcon={<ArrowForwardIcon />}
                                                              sx={{
                                                                                backgroundColor: 'white',
                                                                                color: theme.palette.primary.main,
                                                                                fontWeight: 'bold',
                                                                                px: 4,
                                                                                py: 1.5,
                                                                                fontSize: '1rem',
                                                                                '&:hover': {
                                                                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                                                                    transform: 'translateY(-2px)',
                                                                                },
                                                                                transition: 'all 0.3s ease',
                                                              }}
                                                            >
                                                            Get Started Free
                                              </Button>Button>
                                  </Grid>Grid>
                        
                                  <Grid item xs={12} md={6}>
                                              <Box
                                                              sx={{
                                                                                background: 'rgba(255, 255, 255, 0.95)',
                                                                                borderRadius: '20px',
                                                                                p: { xs: 3, md: 4 },
                                                                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                                                              }}
                                                            >
                                                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                                                            What You Get:
                                                            </Typography>Typography>
                                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                                              {benefits.map((benefit, index) => (
                                                                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                                                                    <CheckCircleIcon sx={{ color: theme.palette.primary.main, fontSize: '1.3rem', flexShrink: 0 }} />
                                                                                                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                                                                                                      {benefit}
                                                                                                      </Typography>Typography>
                                                                                </Box>Box>
                                                                              ))}
                                                            </Box>Box>
                                                            <Typography sx={{ mt: 3, textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem' }}>
                                                                            ✓ Free signup • No credit card required • Cancel anytime
                                                            </Typography>Typography>
                                              </Box>Box>
                                  </Grid>Grid>
                        </Grid>Grid>
                </Container>Container>
          </Box>Box>
        );
};

export default CTASection;</Box>
