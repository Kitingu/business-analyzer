import db from '../models';

class BusinessServices {
  static async checkDuplicates(address, country, abbreviation, owner) {
    const business = await db.business.findAll({
      where: {
        address,
        country,
        abbreviation,
        owner,
      },
    });
    return business;
  }
}
export default BusinessServices;
