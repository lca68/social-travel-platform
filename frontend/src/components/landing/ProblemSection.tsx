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
import SearchOffIcon from '@mui/icons-material/SearchOff';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';

interface ProblemItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ProblemSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const problems: ProblemItem[] = [
      {
              icon: <SearchOffIcon sx={{ fontSize: '3rem' }} />,
              title: 'Hard to Find Authentic Recommendations',
              description:
                        'Travel blogs and guides are often outdated or biased. Finding genuine, real-time recommendations from local experts is nearly impossible.',
      },
      {
              icon: <GroupsIcon sx={{ fontSize: '3rem' }} />,
              title: 'Isolated Travel Planning',
              description:
                        'Planning trips alone means missing out on group adventures and shared experiences. Travelers feel disconnected from like-minded explorers.',
      },
      {
              icon: <SecurityIcon sx={{ fontSize: '3rem' }} />,
              title: 'Safety Concerns & Trust Issues',
              description:
                        'With strangers online, verifying credibility and ensuring safety is challenging. There\'s no trusted community to validate information.',
      },
      {
              icon: <StorageIcon sx={{ fontSize: '3rem' }} />,
              title: 'Information Scattered Everywhere',
              description:
                        'Travel information is fragmented across multiple platforms. Keeping all your plans, tips, and recommendations in one place is difficult.',
      },
        ];

    return (
          <Box
                  id="problem"
                  sx={{
                            py: { xs: 8, md: 12 },
                            background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}15 100%)`,
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
                                      background: theme.palette.error.main,
                                      borderRadius: '50%',
                                      opacity: 0.08,
                                      top: '50%',
                                      left: '-100px',
                                      transform: 'translateY(-50%)',
                          }}
                        />
                <Box
                          sx={{
                                      position: 'absolute',
                                      width: '250px',
                                      height: '250px',
                                      background: theme.palette.warning.main,
                                      borderRadius: '50%',
                                      opacity: 0.08,
                                      bottom: '-50px',
                                      right: '-50px',
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
                                              The Problem with Modern Travel Planning
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
                                              Travelers face unique challenges when planning their adventures. We're here to solve them.
                                  </Typography>Typography>
                        </Box>Box>
                
                  {/* Problem Cards Grid */}
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                          {problems.map((problem, index) => (
                              <Grid item xs={12} sm={6} md={6} key={index}>
                                            <Card
                                                              sx={{
                                                                                  height: '100%',
                                                                                  background: 'rgba(255, 255, 255, 0.8)',
                                                                                  backdropFilter: 'blur(10px)',
                                                                                  border: `1px solid ${theme.palette.divider}`,
                                                                                  borderRadius: '12px',
                                                                                  transition: 'all 0.3s ease',
                                                                                  position: 'relative',
                                                                                  overflow: 'hidden',
                                                                                  '&:before': {
                                                                                                        content: '""',
                                                                                                        position: 'absolute',
                                                                                                        top: 0,
                                                                                                        left: 0,
                                                                                                        right: 0,
                                                                                                        height: '4px',
                                                                                                        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                                                    },
                                                                                  '&:hover': {
                                                                                                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                                                                                                        transform: 'translateY(-4px)',
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
                                                                                                                            width: '60px',
                                                                                                                            height: '60px',
                                                                                                                            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                                                                                                                            borderRadius: '12px',
                                                                                                                            mb: 2,
                                                                                                                            color: 'white',
                                                                                                      }}
                                                                                                  >
                                                                                {problem.icon}
                                                                              </Box>Box>
                                                            
                                                              {/* Title */}
                                                                              <Typography
                                                                                                    variant="h6"
                                                                                                    sx={{
                                                                                                                            fontWeight: 'bold',
                                                                                                                            color: 'text.primary',
                                                                                                                            mb: 1.5,
                                                                                                                            fontSize: { xs: '1rem', md: '1.1rem' },
                                                                                                      }}
                                                                                                  >
                                                                                {problem.title}
                                                                              </Typography>Typography>
                                                            
                                                              {/* Description */}
                                                                              <Typography
                                                                                                    variant="body2"
                                                                                                    sx={{
                                                                                                                            color: 'text.secondary',
                                                                                                                            lineHeight: 1.6,
                                                                                                                            fontSize: { xs: '0.9rem', md: '0.95rem' },
                                                                                                      }}
                                                                                                  >
                                                                                {problem.description}
                                                                              </Typography>Typography>
                                                            </CardContent>CardContent>
                                            </Card>Card>
                              </Grid>Grid>
                            ))}
                        </Grid>Grid>
                
                  {/* Call to Solution */}
                        <Box
                                    sx={{
                                                  mt: { xs: 6, md: 8 },
                                                  p: { xs: 3, md: 4 },
                                                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                  borderRadius: '12px',
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
                                              We Have the Solution
                                  </Typography>Typography>
                                  <Typography sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                                              Our platform connects travelers, validates experiences, and centralizes planning—all in one secure place.
                                  </Typography>Typography>
                        </Box>Box>
                </Container>Container>
          </Box>Box>
        );
};

export default ProblemSection;</Box>
