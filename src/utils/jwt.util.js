import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_inseguro_no_usar_en_prod';
const ALG = 'HS256';

export function signToken(payload, { expiresIn = '1h' } = {}) {
  return jwt.sign(payload, JWT_SECRET, { algorithm: ALG, expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, { algorithms: [ALG] });
}