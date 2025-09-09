import mongoose from 'mongoose';

const validateObjectId = (paramName) => (req, res, next) => {
  const val = req.params[paramName];
  if (!val || !mongoose.isValidObjectId(val)) {
    return res.status(400).send({ status: 'error', error: `Invalid ${paramName}` });
  }
  next();
};

export default validateObjectId;