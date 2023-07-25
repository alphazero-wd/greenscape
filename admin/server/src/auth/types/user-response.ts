import { Exclude } from 'class-transformer';

export class AuthResponse {
  success: boolean;
  data: UserResponse;
}

class UserResponse {
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  createdAt: string;
  updatedAt: string;
}
