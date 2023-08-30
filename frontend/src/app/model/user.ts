export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
  roles: string[];
}

export interface Credentials {
  username: string;
  password: string;
}

export interface SignUp {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export type UserType = {
  user: User;
};
