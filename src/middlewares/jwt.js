import jwt from 'jsonwebtoken';
import UserServices from '../services/userServices';
import { handleError } from '../utils/response';

require('dotenv');

export default async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    const token = bearerHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    const user = await UserServices.findByEmail(decoded.user.email);
    req.user = user;
    console.log(user);
    if (!user) {
      return handleError(400, 'invalid token please sign up', res);
    }
    next();
  } catch (error) {
    return handleError(400, 'please provide a valid token', res);
  }
};
