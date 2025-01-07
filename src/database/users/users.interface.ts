export interface IUser {
  id: number;
  name: string;
  last_name: string;
  birth_date: string;
  balance: string;
}

export interface ICreateUser {
  name: string;
  last_name: string;
  birth_date: string;
  balance: string;
}

export interface ICreateUserResponse {
  id: number;
}

export interface IGetUsersResponse {
  id: number;
  name: string;
  last_name: string;
  birth_date: string;
  balance: string;
}

export interface IGetUserByIdResponse {
  id: number;
  name: string;
  last_name: string;
  birth_date: string;
  balance: string;
}

export interface IUpdateUser {
  name?: string;
  balance?: string;
  last_name?: string;
  birth_date?: string;
}
