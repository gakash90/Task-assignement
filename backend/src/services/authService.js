import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const signupUser = async ({ firstName, lastName, username, password }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    username,
    password: hashedPassword
  });

  const token = generateToken(user._id);
  return { token };
};

export const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);
  return { token };
};
