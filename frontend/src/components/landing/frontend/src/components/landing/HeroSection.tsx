import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
          <Box
                  id="hero"
                  sx={{
                            minHeight: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            position: 'relative',
                            overflow: 'hidden',
                            pt: { xs: 8, md: 0 },
                  }}
                >
            {/* Animated Background Elements */}
                <Box
                          sx={{
                                      position: 'absolute',
                                      width: '500px',
                                      height: '500px',
                                      background: 'rgba(255, 255, 255, 0.1)',
                                      borderRadius: '50%',
                                      top: '-200px',
                                      right: '-200px',
                                      animation: 'float 6s ease-in-out infinite',
                                      '@keyframes float': {
                                                    '0%, 100%': { transform: 'translateY(0px)' },
                                                    '50%': { transform: 'translateY(20px)' },
                                      },
                          }}
                        />
                <Box
                          sx={{
                                      position: 'absolute',
                                      width: '400px',
                                      height: '400px',
                                      background: 'rgba(255, 255, 255, 0.05)',
                                      borderRadius: '50%',
                                      bottom: '-150px',
                                      left: '-150px',
                                      animation: 'float 8s ease-in-out infinite',
                                      '@keyframes float': {
                                                    '0%, 100%': { transform: 'translateY(0px)' },
                                                    '50%': { transform: 'translateY(20px)' },
                                      },
                          }}
                        />
          
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        <Grid container spacing={4} alignItems="center">
                                  <Grid item xs={12} md={6}>
                                              <Box sx={{ animation: 'slideInLeft 0.8s ease-out' }}>
                                                            <Typography
                                                                              variant="h2"
                                                                              component="h1"
                                                                              sx={{
                                                                                                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                                                                                                  fontWeight: 'bold',
                                                                                                  color: 'white',
                                                                                                  mb: 2,
                                                                                                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                                                                                  lineHeight: 1.2,
                                                                              }}
                                                                            >
                                                                            Discover Travel Like Never Before
                                                            </Typography>Typography>
                                              
                                                            <Typography
                                                                              variant="h5"
                                                                              sx={{
                                                                                                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                                                                                                  color: 'rgba(255, 255, 255, 0.9)',
                                                                                                  mb: 3,
                                                                                                  lineHeight: 1.6,
                                                                              }}
                                                                            >
                                                                            Connect with travelers worldwide, share personalized recommendations, and plan your next adventure together.
                                                            </Typography>Typography>
                                              
                                                            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                                                            <Button
                                                                                                variant="contained"
                                                                                                color="secondary"
                                                                                                size={isMobile ? 'medium' : 'large'}
                                                                                                onClick={() => navigate('/signup')}
                                                                                                endIcon={<ArrowForwardIcon />}
                                                                                                sx={{
                                                                                                                      px: { xs: 2, md: 4 },
                                                                                                                      py: { xs: 1.2, md: 1.5 },
                                                                                                                      fontSize: '1rem',
                                                                                                                      fontWeight: 'bold',
                                                                                                                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                                                                                                      '&:hover': {
                                                                                                                                              transform: 'translateY(-2px)',
                                                                                                                                              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                                                                                                                        },
                                                                                                                      transition: 'all 0.3s ease',
                                                                                                  }}
                                                                                              >
                                                                                              Get Started Free
                                                                            </Button>Button>
                                                            
                                                                            <Button
                                                                                                variant="outlined"
                                                                                                sx={{
                                                                                                                      color: 'white',
                                                                                                                      borderColor: 'rgba(255, 255, 255, 0.5)',
                                                                                                                      px: { xs: 2, md: 4 },
                                                                                                                      py: { xs: 1.2, md: 1.5 },
                                                                                                                      fontSize: '1rem',
                                                                                                                      fontWeight: 'bold',
                                                                                                                      '&:hover': {
                                                                                                                                              borderColor: 'white',
                                                                                                                                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                                                                                                              transform: 'translateY(-2px)',
                                                                                                                        },
                                                                                                                      transition: 'all 0.3s ease',
                                                                                                  }}
                                                                                              >
                                                                                              Learn More
                                                                            </Button>Button>
                                                            </Box>Box>
                                              
                                                {/* Trust Indicators */}
                                                            <Box sx={{ mt: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                                                            <Box>
                                                                                              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                                                                                  10K+
                                                                                                </Typography>Typography>
                                                                                              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                                                                                                                  Active Travelers
                                                                                                </Typography>Typography>
                                                                            </Box>Box>
                                                                            <Box>
                                                                                              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                                                                                  50+
                                                                                                </Typography>Typography>
                                                                                              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                                                                                                                  Countries
                                                                                                </Typography>Typography>
                                                                            </Box>Box>
                                                                            <Box>
                                                                                              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                                                                                  4.8★
                                                                                                </Typography>Typography>
                                                                                              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                                                                                                                  User Rating
                                                                                                </Typography>Typography>
                                                                            </Box>Box>
                                                            </Box>Box>
                                              </Box>Box>
                                  </Grid>Grid>
                        
                          {/* Right Side - Hero Image/Card */}
                                  <Grid item xs={12} md={6}>
                                              <Box
                                                              sx={{
                                                                                animation: 'slideInRight 0.8s ease-out',
                                                                                perspective: '1000px',
                                                              }}
                                                            >
                                                            <Card
                                                                              sx={{
                                                                                                  background: 'rgba(255, 255, 255, 0.95)',
                                                                                                  backdropFilter: 'blur(10px)',
                                                                                                  borderRadius: '20px',
                                                                                                  overflow: 'hidden',
                                                                                                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                                                                                                  transform: 'rotateY(-5deg)',
                                                                                                  '&:hover': {
                                                                                                                        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
                                                                                                                        transform: 'rotateY(-3deg)',
                                                                                                    },
                                                                                                  transition: 'all 0.3s ease',
                                                                              }}
                                                                            >
                                                                            <Box
                                                                                                sx={{
                                                                                                                      width: '100%',
                                                                                                                      height: '400px',
                                                                                                                      background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                                                                                                                      display: 'flex',
                                                                                                                      alignItems: 'center',
                                                                                                                      justifyContent: 'center',
                                                                                                                      position: 'relative',
                                                                                                  }}
                                                                                              >
                                                                                              <Typography
                                                                                                                    variant="h4"
                                                                                                                    sx={{
                                                                                                                                            color: 'white',
                                                                                                                                            fontWeight: 'bold',
                                                                                                                                            textAlign: 'center',
                                                                                                                                            position: 'relative',
                                                                                                                                            zIndex: 1,
                                                                                                                      }}
                                                                                                                  >
                                                                                                                  🌍 Explore the World
                                                                                                </Typography>Typography>
                                                                            </Box>Box>
                                                            
                                                                            <CardContent sx={{ p: 3 }}>
                                                                                              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                                                                                  Join Our Community
                                                                                                </Typography>Typography>
                                                                                              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                                                                                                                  Be part of a vibrant community of travelers sharing experiences, tips, and recommendations from around the globe.
                                                                                                </Typography>Typography>
                                                                                              <Box sx={{ display: 'flex', gap: 1 }}>
                                                                                                {['✈️ Explore', '🤝 Connect', '📍 Plan'].map((tag) => (
                                                                                                    <Box
                                                                                                                              key={tag}
                                                                                                                              sx={{
                                                                                                                                                          backgroundColor: theme.palette.primary.light,
                                                                                                                                                          color: theme.palette.primary.dark,
                                                                                                                                                          px: 2,
                                                                                                                                                          py: 0.5,
                                                                                                                                                          borderRadius: '20px',
                                                                                                                                                          fontSize: '0.85rem',
                                                                                                                                                          fontWeight: 'bold',
                                                                                                                                }}
                                                                                                                            >
                                                                                                      {tag}
                                                                                                      </Box>Box>
                                                                                                  ))}
                                                                                                </Box>Box>
                                                                            </CardContent>CardContent>
                                                            </Card>Card>
                                              </Box>Box>
                                  </Grid>Grid>
                        </Grid>Grid>
                </Container>Container>
          
                <style>
                  {`
                            @keyframes slideInLeft {
                                        from {
                                                      opacity: 0;
                                                                    transform: translateX(-50px);
                                                                                }
                                                                                            to {
                                                                                                          opacity: 1;
                                                                                                                        transform: translateX(0);
                                                                                                                                    }
                                                                                                                                              }
                                                                                                                                                        @keyframes slideInRight {
                                                                                                                                                                    from {
                                                                                                                                                                                  opacity: 0;
                                                                                                                                                                                                transform: translateX(50px);
                                                                                                                                                                                                            }
                                                                                                                                                                                                                        to {
                                                                                                                                                                                                                                      opacity: 1;
                                                                                                                                                                                                                                                    transform: translateX(0);
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                  `}
                </style>style>
          </Box>Box>
        );
};

export default HeroSection;</Box>
