import { compare, hash } from 'bcrypt';

import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import User from '../models/user/userInfo';
const SECRET_KEY: string = process.env.SECRET || '';

export async function signup(req: Request, res: Response) {
  const { firstName, lastName, email, phone, password } = req.body;

  // Check if user with the same email already exists
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(409)
      .send({ error: '409', message: 'user already exist' });
  }
  try {
    if (password === '') throw new Error();
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    //Generate JWT Token

    const accessToken = sign({ _id: newUser.id }, SECRET_KEY);

    // Respond with sucsess and token
    res.status(201).send({ accessToken });
  } catch (error) {
    console.log('error creating user:', error);
    res.status(400).json({ error, message: 'could not create user' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error();
    }
    const validatePass = await compare(password, user.password);
    if (!validatePass) throw new Error();
    const accessToken = sign({ _id: user.id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: '401', message: 'email or password is incorrect ' });
  }
}
