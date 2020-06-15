import { handleSuccess, handleError } from '../utils/response';
import { encodeToken,createPayload, hashPassword,userProfile } from '../utils/auth';
import UserServices from '../services/userServices';
import db from '../models'

export const signup = async (req, res) => {
  const newUser = req.body;
  const { email } = newUser;
  const user = await UserServices.findByEmail(email);
  if (!user) {
    const hashedPassword = hashPassword(newUser.password);
    try {
      const user = await db.User.create({
        ...newUser,
        password: hashedPassword,
      });
      const token = encodeToken(createPayload(newUser.email, newUser.isAdmin));
      user.token = token;
      return handleSuccess(201, 'User registered successfully',userProfile(user), res);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  } else {
    return handleError(
      409,
      `user with ${email} already exists please login`,
      res
    );
  }
};
