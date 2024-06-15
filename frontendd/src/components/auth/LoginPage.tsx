import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { setAuthHeader } from "../services/BackendService";
import { login } from "../services/apiService";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const response = await login(email, password);

            if (response.status === 200) {
                setAuthHeader(response.data["token"]);
                history('/');
                window.location.reload();
            } else {
                setError('An unexpected error occurred. Please try again.');
                setAuthHeader(null);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setError('Invalid username or password.');
            } else {
                setError('Login failed. Please try again.');
            }
            setAuthHeader(null);
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
                    Login Page
                </Typography>
                <TextField
                    label="Email address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ height: '50px', marginTop: '1rem' }}
                    onClick={handleLogin}
                >
                    Sign in
                </Button>
                <Typography align="center" marginTop="1rem">
                    Not a member? <a href="/signup">Register</a>
                </Typography>
            </Box>
        </Box>
    );
}

export default LoginPage;