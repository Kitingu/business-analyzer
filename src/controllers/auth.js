import { handleSuccess, handleError } from '../utils/response';
import { encodeToken,createPayload, compareHash,hashPassword,userProfile } from '../utils/auth';
import UserServices from '../services/userServices';
import db from '../models'

export const signup = async (req, res) => {
  const newUser = req.body;
  const { email } = newUser;
  const user = await UserServices.findByEmail(email);
  if (!user) {
    const hashedPassword = hashPassword(newUser.password);
    try {
      const user = await db.user.create({
        ...newUser,
        password: hashedPassword,
      });
      const token = encodeToken(createPayload(newUser.email, newUser.isAdmin));
      user.token = token;
      return handleSuccess(201, 'User registered successfully',res,userProfile(user));
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

 export const signIn = async( req, res) =>{
    const { email, password } = req.body;
    if (!email) {
     return handleError(400, "email is required",res);
    }
    if (!password) {
     return handleError(400, "password is required",res);
    }
    const user = await UserServices.findByEmail(email);
    if (user) {
      if (compareHash(password, user.password)) {
        const token = encodeToken(
          createPayload(user.firstname, user.email, user.isAgent, user.isAdmin)
        );
        return handleSuccess(200, "logged in successfully",res, token);
      }
     return handleError(401, "Invalid user login credentials",res);
    }
   return handleError(400, "Invalid user login credentials",res);
}
