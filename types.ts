enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
export {Role};

type User = {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  password?: string;
  role: Role;
  user_phone?: string;
  user_address?: string;
  user_birth?: Date;
  wage_rate?: number;
};
export type {User};
