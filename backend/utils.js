import jwt from 'jsonwebtoken';
import User from './models/userModel.js';
export const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const isAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    // const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode.user;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
