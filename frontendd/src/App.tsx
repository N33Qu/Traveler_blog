import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignUpPage';

import Posts from './components/user/Posts';
import CreatePostForm from "./components/user/CreatePostForm";
import LogOut from "./components/auth/LogOut";
import UserProfile from "./components/user/UserProfile";
import {useEffect, useState} from "react";
import {getAuthToken} from "./components/services/BackendService";
import {jwtDecode} from "jwt-decode";
import {CustomJwtPayload} from "./components/entity/CustomJwtPayload";
import Header from "./components/Header";
import AdminHeader from "./components/admin/AdminHeader";
import UserHeader from "./components/user/UserHeader";
import UserPosts from "./components/user/UserPosts";
import AllUserPosts from "./components/admin/AllUserPosts";
import AllUsers from "./components/admin/AllUsers";
import bgImage from './assets/bg.jpg';

function isTokenValid(token: string): boolean {
    try {
        jwtDecode(token);
        return true;
    } catch (error) {
        return false;
    }
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


    const backgroundStyle = {
        background: `url(${bgImage}) no-repeat fixed center / cover`,
        minHeight: '100vh',
    };

    useEffect(() => {
        let token = getAuthToken();
        if (token !== null) {
            if (isTokenValid(token)) {
                setIsAuthenticated(true);
                const decoded = jwtDecode<CustomJwtPayload>(token);
                if (decoded.Role && Array.isArray(decoded.Role)) {
                    const roles = decoded.Role.map(role => role.authority);
                    if (roles.includes("ADMIN")) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    setIsAdmin(false);
                }
            } else {
                setIsAuthenticated(false);
                setIsAdmin(false);
                localStorage.removeItem('token');
                window.location.href = '/';
                window.location.reload();
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <div className="App" style={backgroundStyle}>
            <Router>
                {!isAuthenticated ? <Header/> : null}
                {isAuthenticated && !isAdmin ? <UserHeader /> : null}
                {isAuthenticated && isAdmin ? <AdminHeader /> : null}
                <Routes>
                    <Route path="/" element={!isAuthenticated ? <Posts /> : <Posts/>} />
                    <Route path="/login" element={!isAuthenticated ? <LoginPage /> : null} />
                    <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : null} />
                    {/*User paths*/}
                    <Route path="/logout" element={isAuthenticated ? <LogOut /> : <Posts />} />
                    <Route path="/createPost" element={isAuthenticated ? <CreatePostForm /> : <Posts />} />
                    <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Posts />} />
                    <Route path="/myPosts" element={isAuthenticated ? <UserPosts /> : <Posts />} />
                    {/*Admin paths*/}
                    <Route path="/allPosts" element={isAdmin && isAuthenticated ? <AllUserPosts /> : <Posts />} />
                    <Route path="/allUsers" element={isAdmin && isAuthenticated ? <AllUsers /> : <Posts />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;