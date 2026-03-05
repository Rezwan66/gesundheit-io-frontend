export interface ILoginResponse {
  token: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    isDeleted: boolean;
    role: string;
    status: string;
    needPasswordChange: boolean;
    deletedAt?: Date | null | undefined;
  };
}
