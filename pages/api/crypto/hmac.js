import forge from 'node-forge'

export default function handler(req, res) {
  const algorithm = req.body.algorithm
  const inputText = req.body.inputText
  const secret = req.body.secret

  const hmac = forge.hmac.create()
  hmac.start(algorithm, secret)
  hmac.update(inputText)
  const hmacValue = hmac.digest().toHex()

  res.status(200).json({ hmacValue })
}
