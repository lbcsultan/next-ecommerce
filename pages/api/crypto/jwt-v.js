import jwt from 'jsonwebtoken'
import { getSession } from 'next-auth/react'
import CryptoLog from '../../../models/CryptoLog'
import db from '../../../utils/db'

const SECRET = process.env.JWT_SECRET

export default async function handler(req, res) {
  const token = req.body.token

  const result = jwt.verify(token, SECRET)

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send({ message: 'signin required' })
  }
  const { user } = session
  const email = user.email

  const requestString = JSON.stringify(req.body)
  const resultString = JSON.stringify({ result })

  const newCryptoLog = new CryptoLog({
    email,
    service: 'JWT verification',
    request: requestString,
    result: resultString,
  })

  await db.connect()
  await newCryptoLog.save()
  await db.disconnect()

  res.status(200).json({ result })
}
