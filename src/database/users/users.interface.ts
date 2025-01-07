export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  balance: string;
  email: string;
  password: string;
}

export interface ICreateUser {
  first_name: string;
  last_name: string;
  birth_date: Date;
  balance: string;
  email: string;
  password: string;
}

export interface ICreateUserResponse {
  id: number;
}

export interface IGetUsersResponse {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  balance: string;
  email: string;
}

export interface IGetUserByIdResponse {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  balance: string;
  email: string;
}

export interface IUpdateUser {
  first_name?: string;
  balance?: string;
  last_name?: string;
  birth_date?: Date;
  email?: string;
  password?: string;
}
