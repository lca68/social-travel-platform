import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpeedIcon from '@mui/icons-material/Speed';
import PublicIcon from '@mui/icons-material/Public';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeaturesSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const features: Feature[] = [
      {
              icon: <FavoriteBorderIcon sx={{ fontSize: '2.5rem' }} />,
              title: 'Curated Recommendations',
              description:
                        'Get personalized travel tips from real travelers who have been there. No bots, no spam—just genuine recommendations from people like you.',
      },
      {
              icon: <PeopleAltIcon sx={{ fontSize: '2.5rem' }} />,
              title: 'Vibrant Community',
              description:
                        'Connect with adventurous travelers from around the world. Share experiences, ask questions, and build friendships with like-minded explorers.',
      },
      {
              icon: <VerifiedUserIcon sx={{ fontSize: '2.5rem' }} />,
              title: 'Verified & Trusted',
              description:
                        'All users and recommendations are verified. Our community vetting system ensures safety and authenticity in every interaction.',
      },
      {
              icon: <SpeedIcon sx={{ fontSize: '2.5rem' }} />,
              title: 'Real-Time Planning',
              description:
                        'Access live updates, current conditions, and up-to-date information. Plan with confidence knowing you have the latest travel intel.',
      },
      {
              icon: <PublicIcon sx={{ fontSize: '2.5rem' }} />,
              title: 'Global Coverage',
              description:
                        'Explore recommendations from 50+ countries with growing coverage. Our community spans every continent and keeps expanding daily.',
      },
      {
              icon: <LightbulbIcon sx={{ fontSize: '2.5rem' }} />,
              title: 'Smart Itinerary Tools',
              description:
                        'Our intelligent planning tools help you organize trips, set budgets, and create perfect itineraries tailored to your preferences.',
      },
        ];

    return (
          <Box
                  id="features"
                  sx={{
                            py: { xs: 8, md: 12 },
                            background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.secondary.light}10 100%)`,
                            position: 'relative',
                            overflow: 'hidden',
                  }}
                >
            {/* Background animation elements */}
                <Box
                          sx={{
                                      position: 'absolute',
                                      width: '400px',
                                      height: '400px',
                                      background: theme.palette.secondary.main,
                                      borderRadius: '50%',
                                      opacity: 0.06,
                                      top: '-100px',
                                      right: '-100px',
                                      animation: 'float 8s ease-in-out infinite',
                                      '@keyframes float': {
                                                    '0%, 100%': { transform: 'translateY(0px)' },
                                                    '50%': { transform: 'translateY(30px)' },
                                      },
                          }}
                        />
                <Box
                          sx={{
                                      position: 'absolute',
                                      width: '350px',
                                      height: '350px',
                                      background: theme.palette.primary.main,
                                      borderRadius: '50%',
                                      opacity: 0.05,
                                      bottom: '-50px',
                                      left: '-50px',
                                      animation: 'float 10s ease-in-out infinite',
                                      '@keyframes float': {
                                                    '0%, 100%': { transform: 'translateY(0px)' },
                                                    '50%': { transform: 'translateY(30px)' },
                                      },
                          }}
                        />
          
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                  {/* Section Header */}
                        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                                  <Typography
                                                variant="h3"
                                                component="h2"
                                                sx={{
                                                                fontSize: { xs: '2rem', md: '2.8rem' },
                                                                fontWeight: 'bold',
                                                                color: 'text.primary',
                                                                mb: 2,
                                                }}
                                              >
                                              Why Choose SocialTravel?
                                  </Typography>Typography>
                                  <Typography
                                                variant="h6"
                                                sx={{
                                                                fontSize: { xs: '1rem', md: '1.2rem' },
                                                                color: 'text.secondary',
                                                                maxWidth: '650px',
                                                                mx: 'auto',
                                                                lineHeight: 1.6,
                                                }}
                                              >
                                              Everything you need to plan incredible trips and connect with a global community of travelers.
                                  </Typography>Typography>
                        </Box>Box>
                
                  {/* Features Grid */}
                        <Grid container spacing={{ xs: 3, md: 4 }}>
                          {features.map((feature, index) => (
                              <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Card
                                                              sx={{
                                                                                  height: '100%',
                                                                                  background: 'rgba(255, 255, 255, 0.7)',
                                                                                  backdropFilter: 'blur(10px)',
                                                                                  border: `1px solid ${theme.palette.divider}`,
                                                                                  borderRadius: '16px',
                                                                                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                                                  position: 'relative',
                                                                                  overflow: 'hidden',
                                                                                  '&:before': {
                                                                                                        content: '""',
                                                                                                        position: 'absolute',
                                                                                                        top: 0,
                                                                                                        left: 0,
                                                                                                        right: 0,
                                                                                                        height: '3px',
                                                                                                        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                                                    },
                                                                                  '&:hover': {
                                                                                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                                                                                                        transform: 'translateY(-8px)',
                                                                                                        background: 'rgba(255, 255, 255, 0.9)',
                                                                                    },
                                                              }}
                                                            >
                                                            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                                                              {/* Icon Container */}
                                                                              <Box
                                                                                                    sx={{
                                                                                                                            display: 'flex',
                                                                                                                            alignItems: 'center',
                                                                                                                            justifyContent: 'center',
                                                                                                                            width: '70px',
                                                                                                                            height: '70px',
                                                                                                                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                                                                                            borderRadius: '14px',
                                                                                                                            mb: 2,
                                                                                                                            color: 'white',
                                                                                                                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                                                                                            '&:hover': {
                                                                                                                                                      transform: 'scale(1.1) rotate(5deg)',
                                                                                                                              },
                                                                                                      }}
                                                                                                  >
                                                                                {feature.icon}
                                                                              </Box>Box>
                                                            
                                                              {/* Title */}
                                                                              <Typography
                                                                                                    variant="h6"
                                                                                                    sx={{
                                                                                                                            fontWeight: 'bold',
                                                                                                                            color: 'text.primary',
                                                                                                                            mb: 1.5,
                                                                                                                            fontSize: { xs: '1.05rem', md: '1.15rem' },
                                                                                                      }}
                                                                                                  >
                                                                                {feature.title}
                                                                              </Typography>Typography>
                                                            
                                                              {/* Description */}
                                                                              <Typography
                                                                                                    variant="body2"
                                                                                                    sx={{
                                                                                                                            color: 'text.secondary',
                                                                                                                            lineHeight: 1.7,
                                                                                                                            fontSize: { xs: '0.9rem', md: '0.95rem' },
                                                                                                      }}
                                                                                                  >
                                                                                {feature.description}
                                                                              </Typography>Typography>
                                                            </CardContent>CardContent>
                                            </Card>Card>
                              </Grid>Grid>
                            ))}
                        </Grid>Grid>
                
                  {/* Feature Highlights */}
                        <Box
                                    sx={{
                                                  mt: { xs: 6, md: 8 },
                                                  display: 'grid',
                                                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                                                  gap: { xs: 2, md: 3 },
                                    }}
                                  >
                          {[
                                    { count: '50+', label: 'Countries' },
                                    { count: '10K+', label: 'Active Travelers' },
                                    { count: '100K+', label: 'Recommendations' },
                                              ].map((stat, index) => (
                                                            <Box
                                                                            key={index}
                                                                            sx={{
                                                                                              textAlign: 'center',
                                                                                              p: { xs: 2, md: 3 },
                                                                                              background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
                                                                                              borderRadius: '12px',
                                                                                              border: `1px solid ${theme.palette.divider}`,
                                                                            }}
                                                                          >
                                                                          <Typography
                                                                                            variant="h4"
                                                                                            sx={{
                                                                                                                fontWeight: 'bold',
                                                                                                                color: theme.palette.primary.main,
                                                                                                                mb: 0.5,
                                                                                                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                                                                                              }}
                                                                                          >
                                                                            {stat.count}
                                                                          </Typography>Typography>
                                                                          <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
                                                                            {stat.label}
                                                                          </Typography>Typography>
                                                            </Box>Box>
                                                          ))}
                        </Box>Box>
                </Container>Container>
          </Box>Box>
        );
};

export default FeaturesSection;</Box>
