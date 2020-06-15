import db from '../models';

class UserServices {
  static async findByEmail(email) {
    const user = await db.user.findOne({
      where: { email },
    });
    if (!user) return null;
    return user.dataValues;
  }
}
export default UserServices;
