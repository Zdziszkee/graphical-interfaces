import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function ForgotPasswordPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 2,
                backgroundColor: '#f5f5f5',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: 360,
                    gap: 2,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Reset Password
                </Button>
            </Box>
        </Box>
    );
}

export default ForgotPasswordPage;
