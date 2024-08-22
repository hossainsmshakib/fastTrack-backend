import { Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExtendedRequest } from '../interfaces/extendedRequest';
import User from '../models/user/userInfo';
const SECRET = process.env.SECRET || '';

export const authMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: Function
) => {
  //extract token from auth heaers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  try {
    //verify & decode payload
    const verifiedToken = verify(token, SECRET);
    if (typeof verifiedToken !== 'string') {
      const user = await User.findOne({ _id: verifiedToken._id });
      if (!user) return res.sendStatus(401);
      req.user = user;
    } else {
      throw new Error();
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};
