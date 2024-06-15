export interface Post {
    id: string;
    title: string;
    body: string;
    author: string;
    createdAt: string;
    image: {
        data: string;
        type: number;
    } | null;
}
export interface User {
    id: string;
    username: string;
    email: string;
}

export interface UserEdit {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
}