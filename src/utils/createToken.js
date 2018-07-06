import jwt from 'jsonwebtoken'

export default function(payload, issuer) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'csapppwd', { issuer })
}
