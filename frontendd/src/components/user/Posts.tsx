import { Post } from '../entity/types';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from "@mui/material";
import { useState, useEffect } from 'react';
import React from "react";
import { getPosts } from "../services/apiService";

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await getPosts();
                setPosts(response.data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
            setIsLoading(false);
        };

        fetchPosts();
    }, []);

    const renderImage = (post: Post) => {
        if (post.image && post.image.data) {
            return <CardMedia component="img" height="300" image={`data:image/jpeg;base64,${post.image.data}`} alt="Post Image" />;
        }
        return null;
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            {isLoading ? (
                <Grid item>
                    <CircularProgress />
                </Grid>
            ) : (
                posts.map(post => (
                    <Grid item key={post.id} xs={12} sm={5} md={3}>
                        <Card sx={{ maxWidth: 345, minWidth: 300 , margin: 2 }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {post.title} by {post.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.body}
                                </Typography>
                                {renderImage(post)}
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default Posts;