import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
dotenv.config();

export const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const compareHash = (password, hashedPassword) => {
  if (bcrypt.compareSync(password, hashedPassword)) {
    return true;
  }

  return false;
};

export const createPayload = (email, isAdmin) => ({
  email,
  isAdmin,
});

export const encodeToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: '2 days',
  });

  return token;
};

export const userProfile = ({
  firstname,
  lastname,
  email,
  isAdmin,
  token,
}) => ({
  firstname,
  lastname,
  email,
  isAdmin,
  token,
});
