import jwt from 'jsonwebtoken';
import UserServices from '../services/user';

import { Response } from '../helpers/utils';

const userResponse = new Response();
require('dotenv');

export default {
  async verifyToken(req, res, next) {
    // get auth header value

    try {
      const bearerHeader = req.headers.authorization;
      const token = bearerHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await UserServices.findByEmail(decoded.user.email);
      req.user = user;
      if (!user) {
        userResponse.setError(400, 'invalid token please sign up');
        return userResponse.send(res);
      }
      next();
    } catch (error) {
      userResponse.setError(400, 'please provide a valid token');
      return userResponse.send(res);
    }
  },
};
