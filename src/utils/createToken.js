import jwt from 'jsonwebtoken'
import config from '../config'

export default function(payload, issuer) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'magentopwd', { issuer })
}
