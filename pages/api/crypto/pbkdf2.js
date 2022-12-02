import { getSession } from 'next-auth/react'
import forge from 'node-forge'
import CryptoLog from '../../../models/CryptoLog'
import db from '../../../utils/db'

export default async function handler(req, res) {
  const password = req.body.password
  const salt = req.body.salt
  const iteration = parseInt(req.body.iteration)
  const keyLength = parseInt(req.body.keyLength)

  const key = forge.util.bytesToHex(
    forge.pkcs5.pbkdf2(password, salt, iteration, keyLength)
  )

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send({ message: 'signin required' })
  }
  const { user } = session
  const email = user.email

  const requestString = JSON.stringify(req.body)
  const resultString = JSON.stringify({ key })

  const newCryptoLog = new CryptoLog({
    email,
    service: 'PBKDF2',
    request: requestString,
    result: resultString,
  })

  await db.connect()
  await newCryptoLog.save()
  await db.disconnect()

  res.status(200).json({ key })
}
