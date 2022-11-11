import forge from 'node-forge'

export default function handler(req, res) {
  const algorithm = req.body.algorithm
  const inputText = req.body.inputText
  let hashValue
  console.log(algorithm)
  console.log(inputText)

  switch (algorithm) {
    case 'md5':
      // eslint-disable-next-line no-case-declarations
      let md1 = forge.md.md5.create()
      md1.update(inputText)
      hashValue = md1.digest().toHex()
      res.status(200).json({ hashValue })
      return
    case 'sha1':
      // eslint-disable-next-line no-case-declarations
      let md2 = forge.md.sha1.create()
      md2.update(inputText)
      hashValue = md2.digest().toHex()
      res.status(200).json({ hashValue })
      return
    case 'sha256':
      // eslint-disable-next-line no-case-declarations
      let md3 = forge.md.sha256.create()
      md3.update(inputText)
      hashValue = md3.digest().toHex()
      res.status(200).json({ hashValue })
      return
    case 'sha384':
      // eslint-disable-next-line no-case-declarations
      let md4 = forge.md.sha384.create()
      md4.update(inputText)
      hashValue = md4.digest().toHex()
      res.status(200).json({ hashValue })
      return
    case 'sha512':
      // eslint-disable-next-line no-case-declarations
      let md5 = forge.md.sha512.create()
      md5.update(inputText)
      hashValue = md5.digest().toHex()
      res.status(200).json({ hashValue })
      return
  }
}
