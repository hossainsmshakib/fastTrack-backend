import { ObjectId } from 'mongodb';

export interface Propose {
  _id?: ObjectId;
  timezone: string;
  date: Date;
  difficulty: string;
  objective: string;
}
