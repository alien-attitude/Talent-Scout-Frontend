// src/types/auth.ts

export interface Employer {
    _id:         string;
    username:    string;
    firstname:   string;
    lastname:    string;
    email:       string;
    companyname: string;
    role:        "employer" | "admin";
    isActive:    boolean;
    createdAt:   string;
}

export interface SignUpPayload {
    username:    string;
    firstname:   string;
    lastname:    string;
    email:       string;
    companyname: string;
    password:    string;
}

export interface LoginPayload {
    email?:    string;
    username?: string;
    password:  string;
}

// Shape of what the backend returns on login/signup
export interface AuthResponse {
    success:  boolean;
    message:  string;
    employer: Employer;
    data: {
        accessToken:  string;
        refreshToken: string;
        employer:     Employer;
    };
}

export interface AuthContextType {
    employer:  Employer | null;
    loading:   boolean;
    isAuthenticated: boolean
    signUp:    (data: SignUpPayload) => Promise<void>;
    logIn:     (data: LoginPayload) => Promise<void>;
    logOut:    () => Promise<void>;
}