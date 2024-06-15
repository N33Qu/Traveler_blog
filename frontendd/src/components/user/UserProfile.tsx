import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../entity/types';
import {changePassword, getProfile} from "../services/apiService";
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField, DialogActions
} from '@mui/material';

const UserProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfile();
                setUser(response.data);
            } catch (error) {
                setError('Error fetching user data:' + error);
            }
        };

        fetchData();
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmationPassword('');
    };

    if (!user) {
        return <div>Loading user profile...</div>;
    }

    const handleChangePassword = async () => {
        try {
            if (!currentPassword || !newPassword || !confirmationPassword) {
                setError("All fields are required");
                return;
            }
            if (newPassword !== confirmationPassword) {
                setError("Passwords don't match");
                return;
            }
            if(newPassword.length < 8) {
                setError("Password must be at least 8 characters long");
                return;
            }
            await changePassword(currentPassword, newPassword, confirmationPassword);
            setMessage("Password changed successfully");
            handleCloseDialog();
        } catch (error) {
            setError('Error during password change:' + error);
            return;
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ maxWidth: 400 }}>
                <CardContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                            {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                    </Box>
                    <Typography variant="h5" component="div" align="center" gutterBottom>
                        User Profile
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Username:</strong> {user.username}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Email:</strong> {user.email}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                            Change Password
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        value={confirmationPassword}
                        onChange={(e) => setConfirmationPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {message && <p className="text-success">{message}</p>}
                    {error && <p className="text-danger">{JSON.stringify(error)}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleChangePassword} variant="contained" color="primary">
                        Change Password
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserProfile;