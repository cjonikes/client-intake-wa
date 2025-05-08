export interface UserCredentialsProps {
    email: string;
    password: string;
};

export interface UserInfo {
    sessionId: string,
    type: string,
    username: string,
    lastLogin: string,
};