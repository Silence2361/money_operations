export interface IRegistration {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
}

export interface IRegistrationResponse {
  id: number;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}
