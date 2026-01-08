export class AuthResponseDTO {
    accessToken: string;
    refreshToken: string;
    userId: string;
    userRole: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userProfileImage: string | null;
}