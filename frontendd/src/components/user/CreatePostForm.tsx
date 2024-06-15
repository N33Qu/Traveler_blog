import { useState } from 'react';
import * as React from 'react';
import { Box, TextField, Button, Typography, Input } from '@mui/material';
import axios from "axios";
import { createPost } from "../services/apiService";
import { useNavigate } from 'react-router-dom';

function CreatePostForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [backendResponse, setBackendResponse] = useState("");
    const history = useNavigate();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        } else {
            setImage(null);
        }
    }

    const handleSubmit = async () => {
        try {
            await createPost(title, body, image);
            setBackendResponse("Post created successfully");
            history("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError('Server responded with an error: ' + error.response.status);
                    if (error.response.status === 401) {
                        window.location.href = '/login';
                    }
                } else if (error.request) {
                    console.log(error.request);
                    setError('No response received from the server');
                } else {
                    console.log('Error', error.message);
                    setError('Error sending request: ' + error.message);
                }
            } else {
                console.log('Error', error);
                setError('An unexpected error occurred');
            }
        }
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Box border={1} borderRadius={2} p={4} width="500px" bgcolor="grey.200">
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Create Post
                </Typography>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <Input
                    type="file"
                    fullWidth
                    onChange={handleImageChange}
                />
                {error && <Typography color="error">{error}</Typography>}
                {backendResponse && <Typography color="success">{backendResponse}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ height: '50px', marginTop: '1rem' }}
                    onClick={handleSubmit}
                >
                    Create a Post
                </Button>
            </Box>
        </Box>
    );
}

export default CreatePostForm;