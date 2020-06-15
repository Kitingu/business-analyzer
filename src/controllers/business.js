import db from '../models';
import { handleError, handleSuccess } from '../utils/response';

export const getAll = async (req, res) => {
  const businesses = await db.business.findAll();
  if (!businesses.length) {
    return handleSuccess(200, 'no available properties at the moment', res);
  }
  return handleSuccess(200, 'properties fetched successfully', res, businesses);
};

export const createBusiness = async (req,res) => {
  const newBusiness = req.body;
  const owner = req.user.email;

  try {
    const business = await db.business.create({ ...newBusiness, owner });
    return handleSuccess(201, 'User registered successfully',res, business);
  } catch (error) {
    return handleError(500, error.message, res);
  }
};
