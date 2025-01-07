export interface IUser {
  id: number;
  name: string;
  balance: string;
}

export interface ICreateUser {
  name: string;
  balance: string;
}

export interface ICreateUserResponse {
  id: number;
}

export interface IGetUsersResponse {
  id: number;
  name: string;
  balance: string;
}

export interface IGetUserByIdResponse {
  id: number;
  name: string;
  balance: string;
}

export interface IUpdateUser {
  name?: string;
  balance?: string;
}
