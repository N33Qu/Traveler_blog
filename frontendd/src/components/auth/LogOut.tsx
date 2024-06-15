import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { logout } from "../services/apiService";

function LogOutPage() {
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleLogout = async () => {
        const response = await logout()
        if (response !== 'OK') {
            setError(response);
        } else {
            history('/');
            window.location.reload();
        }

    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Box
                border={1}
                borderRadius={2}
                p={4}
                width="500px"
                bgcolor="grey.200"
                boxShadow={3}
            >
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Logout Page
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ height: '50px', marginTop: '1rem' }}
                    onClick={handleLogout}
                >
                    Log Out
                </Button>
                <Typography align="center" marginTop="1rem">
                    <a href="/frontendd/public">Back to Home</a>
                </Typography>
            </Box>
        </Box>
    );
}

export default LogOutPage;