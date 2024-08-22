import { ObjectId } from 'mongodb';

export interface UserInterface {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword?: string;
}
