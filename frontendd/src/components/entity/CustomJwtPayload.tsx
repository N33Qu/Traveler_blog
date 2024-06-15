import {JwtPayload} from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    Role?: { authority: string }[];
}