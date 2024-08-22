import { Request } from 'express'
import { UserInterface } from './userInterface'

export interface ExtendedRequest extends Request {
  user?:UserInterface
}