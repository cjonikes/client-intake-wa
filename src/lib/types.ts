export interface UserCredentialsProps {
    email: string;
    password: string;
};

export interface UserInfo {
    userId:  Number,
    usertype: string,
    username: string,
    lastLogin: string,
};

export interface householdMember {

    firstName: string;
    lastName: string;
    sex: string;
    relationship: string;
    age: Number;
    dob: string;
};