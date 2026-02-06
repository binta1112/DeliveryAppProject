export class AuthResponseDTO {
  accessToken: string;
  refreshToken: string;
  userId: number;
  userRole: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userProfileImage: string | null;
  commerceantId?: string | null;
  livreurId?: string | null;
}