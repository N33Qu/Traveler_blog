import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Modal,
    Box,
    TextField,
    CircularProgress,
} from '@mui/material';
import { getUserPosts, updatePost, deletePost } from '../services/apiService';
import { Post } from '../entity/types';

const UserPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [editPostId, setEditPostId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await getUserPosts();
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updatePost(editPostId!, title, body, image);
            setEditPostId(null);
            setTitle('');
            setBody('');
            setImage(null);
            setShowModal(false);
            fetchPosts();
        } catch (error) {
            console.error('Failed to update post:', error);
        }
        setIsLoading(false);
    };

    const handleEdit = (post: Post) => {
        setEditPostId(post.id);
        setTitle(post.title);
        setBody(post.body);
        setShowModal(true);
    };

    const handleDelete = async (postId: string) => {
        setIsLoading(true);
        try {
            await deletePost(postId);
            fetchPosts();
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
        setIsLoading(false);
    };

    const renderImage = (post: Post) => {
        if (post.image && post.image.data) {
            return <CardMedia component="img" height="200" image={`data:image/jpeg;base64,${post.image.data}`} alt="Post Image" />;
        }
        return null;
    };

    return (
        <div>
            {isLoading && (
                <Box display="flex" justifyContent="center" marginTop={2}>
                    <CircularProgress />
                </Box>
            )}
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                {posts.map(post => (
                    <Card key={post.id} sx={{ maxWidth: 345, margin: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{post.title} by {post.author}</Typography>
                            <Typography variant="body2" color="text.secondary">{post.body}</Typography>
                            {renderImage(post)}
                            <Box display="flex" justifyContent="flex-end" marginTop={2}>
                                <Button variant="contained" color="primary" onClick={() => handleEdit(post)} sx={{ marginRight: 1 }}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(post.id)}>
                                    Delete
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    width: 400,
                }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Edit Post
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <TextField
                            label="Body"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        />
                        <Box display="flex" justifyContent="flex-end" marginTop={2}>
                            <Button variant="contained" color="secondary" onClick={() => setShowModal(false)} sx={{ marginRight: 1 }}>
                                Close
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                Update
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default UserPosts;