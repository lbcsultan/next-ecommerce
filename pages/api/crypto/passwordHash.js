import bcrypt from 'bcryptjs'
import { getSession } from 'next-auth/react'
import CryptoLog from '../../../models/CryptoLog'
import db from '../../../utils/db'

export default async function handler(req, res) {
  const password = req.body.password
  const password1 = req.body.password1

  let hpassword = bcrypt.hashSync(password, 8)
  let result = bcrypt.compareSync(password1, hpassword)

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
    service: 'Password Hash',
    request: requestString,
    result: resultString,
  })

  await db.connect()
  await newCryptoLog.save()
  await db.disconnect()

  res.status(200).json({ result })
}
