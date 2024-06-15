import api from '../api/apiConfig';
import axios from 'axios';
import { setAuthHeader } from './BackendService';

const BASE_URL = 'http://localhost:8080/api/v1';


export const createPost = async (title: string, body: string, image: File | null) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image !== null) {
        formData.append('image', image);
    }

    return await api.post(`/posts/createPost`, formData);
};

export const getPosts = async () => {
    return await axios.get(`${BASE_URL}/posts/getAllPosts`);

};

export const signup = async (username: string, email: string, password: string) => {
        return axios.post(`${BASE_URL}/auth/signup`, {username, email, password});
};

export const login = async (email: string, password: string) => {
        return await axios.post(`${BASE_URL}/auth/login`, { email, password });

};

export const logout = async () => {
    try {
        setAuthHeader(null);
        return 'OK';
    } catch (error: any) {
        if (error.response) {
            return error.response.data.message;
        } else {
            return () => 'Logout failed. Please try again.';
        }
    }
};


export const getProfile = async ()=> {
    return await api.get('/user/profile');
};


export const changePassword = async (currentPassword: string, newPassword: string, confirmationPassword: string) => {
    return await api.patch('/user/changePassword', {currentPassword, newPassword, confirmationPassword});
};

export const getUserPosts = async () => {
    return await api.get(`/posts/getUserPosts`);
}

export const updatePost = async (postId: string, title: string, body: string, image: File | null) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image !== null) {
        formData.append('image', image);
    }
    return await api.patch(`/posts/${postId}`, formData);
};

export const deletePost = async (postId: string) => {
    return await api.delete(`/posts/${postId}`);
};

export const getAllUsers = async () => {
    return await api.get('/user/getAllUsers');
};

export const updateUser = async (userId: string, username: string, email: string, password: string, role: string) => {
    return await api.patch(`/user/updateUser/${userId}`, { username, email, password, role });
};

export const deleteUser = async (userId: string) => {
    return await api.delete(`/user/deleteUser/${userId}`);
};