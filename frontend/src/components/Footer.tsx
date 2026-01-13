import React from 'react';
import { Box, Container, Typography, Grid, Link, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    const footerLinks = {
          Product: ['Features', 'Security', 'Team', 'Enterprise', 'Customer Stories'],
          Company: ['About', 'Blog', 'Careers', 'Contact', 'Press'],
          Resources: ['Documentation', 'Help Center', 'Community', 'Status', 'API'],
          Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance'],
    };

    const socialLinks = [
      { icon: FacebookIcon, url: 'https://facebook.com', label: 'Facebook' },
      { icon: TwitterIcon, url: 'https://twitter.com', label: 'Twitter' },
      { icon: InstagramIcon, url: 'https://instagram.com', label: 'Instagram' },
      { icon: LinkedInIcon, url: 'https://linkedin.com', label: 'LinkedIn' },
        ];

    return (
          <Box
                  component="footer"
                  sx={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                            color: 'white',
                            pt: { xs: 6, md: 8 },
                            pb: { xs: 4, md: 6 },
                  }}
                >
                <Container maxWidth="lg">
                  {/* Main Footer Content */}
                        <Grid container spacing={4} sx={{ mb: 4 }}>
                          {/* Brand Section */}
                                  <Grid item xs={12} md={3}>
                                              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                                            SocialTravel
                                              </Typography>Typography>
                                              <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
                                                            Connecting travelers worldwide and sharing authentic experiences one journey at a time.
                                              </Typography>Typography>
                                              <Box sx={{ display: 'flex', gap: 1.5 }}>
                                                {socialLinks.map((social, index) => {
                                  const Icon = social.icon;
                                  return (
                                                      <Link
                                                                            key={index}
                                                                            href={social.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            sx={{
                                                                                                    color: 'white',
                                                                                                    display: 'flex',
                                                                                                    alignItems: 'center',
                                                                                                    justifyContent: 'center',
                                                                                                    '&:hover': { opacity: 0.7 },
                                                                                                    transition: 'opacity 0.3s',
                                                                            }}
                                                                          >
                                                                          <Icon />
                                                      </Link>Link>
                                                    );
                })}
                                              </Box>Box>
                                  </Grid>Grid>
                        
                          {/* Footer Links */}
                          {Object.entries(footerLinks).map(([category, links]) => (
                              <Grid item xs={6} md={3} key={category}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '0.95rem' }}>
                                              {category}
                                            </Typography>Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                              {links.map((link, index) => (
                                                  <Link
                                                                        key={index}
                                                                        href="#"
                                                                        sx={{
                                                                                                color: 'rgba(255, 255, 255, 0.8)',
                                                                                                textDecoration: 'none',
                                                                                                fontSize: '0.85rem',
                                                                                                '&:hover': {
                                                                                                                          color: 'white',
                                                                                                                          textDecoration: 'underline',
                                                                                                  },
                                                                                                transition: 'color 0.3s',
                                                                        }}
                                                                      >
                                                    {link}
                                                  </Link>Link>
                                                ))}
                                            </Box>Box>
                              </Grid>Grid>
                            ))}
                        </Grid>Grid>
                
                  {/* Divider */}
                        <Box
                                    sx={{
                                                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                                                  my: { xs: 3, md: 4 },
                                    }}
                                  />
                
                  {/* Bottom Section */}
                        <Grid container alignItems="center" spacing={2}>
                                  <Grid item xs={12} md={6}>
                                              <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                                                            © {currentYear} SocialTravel. All rights reserved.
                                              </Typography>Typography>
                                  </Grid>Grid>
                                  <Grid item xs={12} md={6}>
                                              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                                                            <Link href="#" sx={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                                                                            Privacy
                                                            </Link>Link>
                                                            <Link href="#" sx={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                                                                            Terms
                                                            </Link>Link>
                                                            <Link href="#" sx={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                                                                            Cookies
                                                            </Link>Link>
                                              </Box>Box>
                                  </Grid>Grid>
                        </Grid>Grid>
                </Container>Container>
          </Box>Box>
        );
};

export default Footer;</Box>
