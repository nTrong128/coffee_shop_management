enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
export {Role};

type UserType = {
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
export type {UserType};

type ProductType_Type = {
  product_type_id: string;
  product_type_name?: string;
  product_type_desc?: string;
};

export type {ProductType_Type};
