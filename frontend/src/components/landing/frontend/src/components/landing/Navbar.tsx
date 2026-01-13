import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    useTheme,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
          const handleScroll = () => {
                  setScrolled(window.scrollY > 50);
          };

                  window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { label: 'Home', href: '#hero' },
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Social Proof', href: '#social-proof' },
        ];

    const handleNavClick = (href: string) => {
          setMobileMenuOpen(false);
          if (href.startsWith('#')) {
                  const element = document.querySelector(href);
                  if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                  }
          }
    };

    const handleAuthClick = (path: string) => {
          setMobileMenuOpen(false);
          navigate(path);
    };

    const desktopNav = (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    {navLinks.map((link) => (
                      <Button
                                    key={link.label}
                                    color="inherit"
                                    onClick={() => handleNavClick(link.href)}
                                    sx={{
                                                    textTransform: 'none',
                                                    fontSize: '1rem',
                                                    '&:hover': {
                                                                      opacity: 0.8,
                                                    },
                                    }}
                                  >
                        {link.label}
                      </Button>Button>
                    ))}
                  </Box>Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                                    color="inherit"
                                    onClick={() => handleAuthClick('/login')}
                                    sx={{
                                                  textTransform: 'none',
                                                  fontSize: '1rem',
                                                  '&:hover': {
                                                                  opacity: 0.8,
                                                  },
                                    }}
                                  >
                                  Log In
                        </Button>Button>
                        <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAuthClick('/signup')}
                                    sx={{
                                                  textTransform: 'none',
                                                  fontSize: '1rem',
                                    }}
                                  >
                                  Sign Up
                        </Button>Button>
                </Box>Box>
          </Box>Box>
        );
  
    const mobileNav = (
          <>
                <IconButton
                          color="inherit"
                          onClick={() => setMobileMenuOpen(true)}
                          sx={{ ml: 'auto' }}
                        >
                        <MenuIcon />
                </IconButton>IconButton>
                <Drawer
                          anchor="right"
                          open={mobileMenuOpen}
                          onClose={() => setMobileMenuOpen(false)}
                        >
                        <Box
                                    sx={{
                                                  width: 250,
                                                  p: 2,
                                    }}
                                    role="presentation"
                                  >
                                  <Box
                                                sx={{
                                                                display: 'flex',
                                                                justifyContent: 'flex-end',
                                                                mb: 2,
                                                }}
                                              >
                                              <IconButton
                                                              onClick={() => setMobileMenuOpen(false)}
                                                              size="large"
                                                            >
                                                            <CloseIcon />
                                              </IconButton>IconButton>
                                  </Box>Box>
                                  <List>
                                    {navLinks.map((link) => (
                                                  <ListItemButton
                                                                    key={link.label}
                                                                    onClick={() => handleNavClick(link.href)}
                                                                  >
                                                                  <ListItemText primary={link.label} />
                                                  </ListItemButton>ListItemButton>
                                                ))}
                                  </List>List>
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                                              <Button
                                                              fullWidth
                                                              color="primary"
                                                              variant="outlined"
                                                              onClick={() => handleAuthClick('/login')}
                                                            >
                                                            Log In
                                              </Button>Button>
                                              <Button
                                                              fullWidth
                                                              variant="contained"
                                                              color="primary"
                                                              onClick={() => handleAuthClick('/signup')}
                                                            >
                                                            Sign Up
                                              </Button>Button>
                                  </Box>Box>
                        </Box>Box>
                </Drawer>Drawer>
          </>>
        );
  
    return (
          <AppBar
                  position="sticky"
                  sx={{
                            background: scrolled
                                        ? 'rgba(255, 255, 255, 0.95)'
                                        : 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
                            color: scrolled ? 'text.primary' : 'inherit',
                            transition: 'all 0.3s ease',
                  }}
                >
                <Container maxWidth="lg">
                        <Toolbar
                                    sx={{
                                                  display: 'flex',
                                                  justifyContent: 'space-between',
                                                  px: 0,
                                    }}
                                  >
                                  <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                                fontWeight: 'bold',
                                                                fontSize: '1.5rem',
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                                  opacity: 0.8,
                                                                },
                                                }}
                                                onClick={() => handleNavClick('#hero')}
                                              >
                                              SocialTravel
                                  </Typography>Typography>
                        
                          {isMobile ? mobileNav : desktopNav}
                        </Toolbar>Toolbar>
                </Container>Container>
          </AppBar>AppBar>
        );
};

export default Navbar;</></Button>
