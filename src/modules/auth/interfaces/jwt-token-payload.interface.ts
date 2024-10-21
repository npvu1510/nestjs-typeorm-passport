export interface JwtTokenPayload {
  sub: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}
