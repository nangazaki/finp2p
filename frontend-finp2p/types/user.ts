export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  accountType: any;
  updatedAt: string;
  entity: any;
  accountVerify: boolean;
};

export type UserLogged = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  accountType: any;
  updatedAt: string;
};
