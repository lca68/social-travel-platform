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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface Step {
    number: number;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const HowItWorksSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const steps: Step[] = [
      {
              number: 1,
              icon: <PersonAddIcon sx={{ fontSize: '3rem' }} />,
              title: 'Sign Up & Create Profile',
              description:
                        'Create your account in seconds. Build your traveler profile, share your interests, and connect with the community.',
      },
      {
              number: 2,
              icon: <ExploreIcon sx={{ fontSize: '3rem' }} />,
              title: 'Explore & Connect',
              description:
                        'Browse destinations, discover recommendations from verified travelers, and join conversations with explorers worldwide.',
      },
      {
              number: 3,
              icon: <MapIcon sx={{ fontSize: '3rem' }} />,
              title: 'Plan & Share',
              description:
                        'Plan your trips with our smart tools, share your experiences, and help other travelers discover amazing places.',
      },
        ];

    return (
          <Box
                  id="how-it-works"
                  sx={{
                            py: { xs: 8, md: 12 },
                            background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}8 100%)`,
                            position: 'relative',
                            overflow: 'hidden',
                  }}
                >
            {/* Background decoration */}
                <Box
                          sx={{
                                      position: 'absolute',
                                      width: '300px',
                                      height: '300px',
                                      background: theme.palette.primary.main,
                                      borderRadius: '50%',
                                      opacity: 0.07,
                                      top: '10%',
                                      right: '-50px',
                          }}
                        />
                <Box
                          sx={{
                                      position: 'absolute',
                                      width: '250px',
                                      height: '250px',
                                      background: theme.palette.secondary.main,
                                      borderRadius: '50%',
                                      opacity: 0.07,
                                      bottom: '10%',
                                      left: '-50px',
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
                                              How It Works
                                  </Typography>Typography>
                                  <Typography
                                                variant="h6"
                                                sx={{
                                                                fontSize: { xs: '1rem', md: '1.2rem' },
                                                                color: 'text.secondary',
                                                                maxWidth: '600px',
                                                                mx: 'auto',
                                                                lineHeight: 1.6,
                                                }}
                                              >
                                              Get started in three simple steps and join thousands of travelers planning their next adventure.
                                  </Typography>Typography>
                        </Box>Box>
                
                  {/* Steps Container */}
                        <Box sx={{ position: 'relative' }}>
                                  <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
                                    {steps.map((step, index) => (
                                <Grid item xs={12} md={4} key={step.number}>
                                                <Box sx={{ position: 'relative' }}>
                                                  {/* Step Card */}
                                                                  <Card
                                                                                        sx={{
                                                                                                                height: '100%',
                                                                                                                background: 'rgba(255, 255, 255, 0.8)',
                                                                                                                backdropFilter: 'blur(10px)',
                                                                                                                border: `1px solid ${theme.palette.divider}`,
                                                                                                                borderRadius: '16px',
                                                                                                                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                                                                                position: 'relative',
                                                                                                                overflow: 'hidden',
                                                                                                                '&:hover': {
                                                                                                                                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                                                                                                                                          transform: 'translateY(-8px)',
                                                                                                                                          background: 'rgba(255, 255, 255, 0.95)',
                                                                                                                  },
                                                                                          }}
                                                                                      >
                                                                                      <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                                                                                        {/* Step Number Badge */}
                                                                                                            <Box
                                                                                                                                      sx={{
                                                                                                                                                                  position: 'absolute',
                                                                                                                                                                  top: '-12px',
                                                                                                                                                                  left: '30px',
                                                                                                                                                                  width: '50px',
                                                                                                                                                                  height: '50px',
                                                                                                                                                                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                                                                                                                                  borderRadius: '50%',
                                                                                                                                                                  display: 'flex',
                                                                                                                                                                  alignItems: 'center',
                                                                                                                                                                  justifyContent: 'center',
                                                                                                                                                                  color: 'white',
                                                                                                                                                                  fontWeight: 'bold',
                                                                                                                                                                  fontSize: '1.5rem',
                                                                                                                                                                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                              {step.number}
                                                                                                              </Box>Box>
                                                                                      
                                                                                        {/* Icon Container */}
                                                                                                            <Box
                                                                                                                                      sx={{
                                                                                                                                                                  display: 'flex',
                                                                                                                                                                  alignItems: 'center',
                                                                                                                                                                  justifyContent: 'center',
                                                                                                                                                                  width: '80px',
                                                                                                                                                                  height: '80px',
                                                                                                                                                                  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                                                                                                                                                                  borderRadius: '16px',
                                                                                                                                                                  mb: 3,
                                                                                                                                                                  color: theme.palette.primary.main,
                                                                                                                                                                  mx: 'auto',
                                                                                                                                                                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                                                                                                                                  '&:hover': {
                                                                                                                                                                                                transform: 'scale(1.1) rotateZ(-5deg)',
                                                                                                                                                                    },
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                              {step.icon}
                                                                                                              </Box>Box>
                                                                                      
                                                                                        {/* Title */}
                                                                                                            <Typography
                                                                                                                                      variant="h6"
                                                                                                                                      sx={{
                                                                                                                                                                  fontWeight: 'bold',
                                                                                                                                                                  color: 'text.primary',
                                                                                                                                                                  mb: 1.5,
                                                                                                                                                                  textAlign: 'center',
                                                                                                                                                                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                              {step.title}
                                                                                                              </Typography>Typography>
                                                                                      
                                                                                        {/* Description */}
                                                                                                            <Typography
                                                                                                                                      variant="body2"
                                                                                                                                      sx={{
                                                                                                                                                                  color: 'text.secondary',
                                                                                                                                                                  lineHeight: 1.7,
                                                                                                                                                                  textAlign: 'center',
                                                                                                                                                                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                              {step.description}
                                                                                                              </Typography>Typography>
                                                                                        </CardContent>CardContent>
                                                                  </Card>Card>
                                                
                                                  {/* Arrow Connector */}
                                                  {!isMobile && index < steps.length - 1 && (
                                                      <Box
                                                                              sx={{
                                                                                                        position: 'absolute',
                                                                                                        right: '-40px',
                                                                                                        top: '50%',
                                                                                                        transform: 'translateY(-50%)',
                                                                                                        zIndex: 10,
                                                                                }}
                                                                            >
                                                                            <ArrowRightIcon
                                                                                                      sx={{
                                                                                                                                  fontSize: '2.5rem',
                                                                                                                                  color: theme.palette.primary.main,
                                                                                                                                  opacity: 0.6,
                                                                                                                                  animation: 'slideArrow 1.5s ease-in-out infinite',
                                                                                                                                  '@keyframes slideArrow': {
                                                                                                                                                                '0%, 100%': { transform: 'translateX(0)' },
                                                                                                                                                                '50%': { transform: 'translateX(8px)' },
                                                                                                                                    },
                                                                                                        }}
                                                                                                    />
                                                      </Box>Box>
                                                                  )}
                                                </Box>Box>
                                </Grid>Grid>
                              ))}
                                  </Grid>Grid>
                        
                          {/* Flow indicators line (mobile) */}
                          {isMobile && (
                              <Box
                                              sx={{
                                                                position: 'absolute',
                                                                left: '24px',
                                                                top: 0,
                                                                bottom: 0,
                                                                width: '2px',
                                                                background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                                opacity: 0.3,
                                              }}
                                            />
                            )}
                        </Box>Box>
                
                  {/* CTA Section */}
                        <Box
                                    sx={{
                                                  mt: { xs: 6, md: 8 },
                                                  p: { xs: 3, md: 4 },
                                                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                  borderRadius: '16px',
                                                  textAlign: 'center',
                                                  color: 'white',
                                    }}
                                  >
                                  <Typography
                                                variant="h5"
                                                sx={{
                                                                fontWeight: 'bold',
                                                                mb: 1,
                                                                fontSize: { xs: '1.3rem', md: '1.5rem' },
                                                }}
                                              >
                                              Ready to Start Your Journey?
                                  </Typography>Typography>
                                  <Typography sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, opacity: 0.95 }}>
                                              Join thousands of travelers already discovering amazing destinations and sharing authentic experiences.
                                  </Typography>Typography>
                        </Box>Box>
                </Container>Container>
          </Box>Box>
        );
};

export default HowItWorksSection;</Box>
