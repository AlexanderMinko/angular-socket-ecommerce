export class LoginResponse {
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    enabled: boolean;
    roles: string[]
    authToken: string;
    refreshToken: string;
    expiresAt: Date;
}