import { handleError } from "../utils/response";
import Business from '../services/businessServices'

export default async (req, res, next) => {
  const { email } = req.user;
  const owner = email;
  const { address, country, abbreviation } = req.body;

  const business = await Business.checkDuplicates(
    address,
    country,
    abbreviation,
    owner
  );
  if (business.length > 0) {
    return handleError(409, 'Duplicate businesses are not allowed',res);

  }

  next();
};
