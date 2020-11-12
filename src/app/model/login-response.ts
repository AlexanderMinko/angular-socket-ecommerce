export class LoginResponse {
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    enabled: boolean;
    authToken: string;
    refreshToken: string;
    expiresAt: Date;
}