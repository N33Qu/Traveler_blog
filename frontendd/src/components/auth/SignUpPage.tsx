import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { setAuthHeader } from "../services/BackendService";
import { signup } from "../services/apiService";

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSignup = async () => {
        try {
            if (!username || !email || !password || !confirmPassword) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            if (password.length < 8) {
                setError('Password must be at least 8 characters long.');
                return;
            }

            if(username.length < 3 || username.length > 20) {
                setError('Username must be between 3 and 20 characters long.');
                return;
            }


            if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                setError('Invalid email address.');
                return;
            }

            const response = await signup(username, email, password);

            if (response.status === 200) {
                setAuthHeader(response.data["token"]);
                history('/');
                window.location.reload();
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setError('Invalid username or password.');
            }
            if (error.response.status === 409) {
                setError(error.response.data);
            } else {
                setError('Failed to sign up. Please try again.');
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
                width="600px"
                bgcolor="grey.200"
                boxShadow={3}
            >
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Sign Up Page
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Email Address"
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ height: '40px', marginTop: '1rem' }}
                    onClick={handleSignup}
                >
                    Sign Up
                </Button>
                <Typography align="center" marginTop="1rem">
                    Already Registered? <a href="/login">Login</a>
                </Typography>
            </Box>
        </Box>
    );
}

export default SignupPage;