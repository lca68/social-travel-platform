import React from 'react';
import { Box, Container } from '@mui/material';
import SignupForm from '../components/auth/SignupForm';

const SignupPage: React.FC = () => {
    return (
          <Box
                  sx={{
                            minHeight: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            py: 4,
                  }}
                >
                <Container maxWidth="sm">
                        <SignupForm />
                </Container>Container>
          </Box>Box>
        );
};

export default SignupPage;</Box>
