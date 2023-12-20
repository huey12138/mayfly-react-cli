import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

export const generateToken = (payload: object): string => {
  const secret = fs.readFileSync(
    path.resolve(__dirname, '../RS256/rsa_private.pem')
  );

  const token = jwt.sign(payload, secret, {
    algorithm: 'RS256',
    expiresIn: 60 * 60,
  });

  return token;
};
