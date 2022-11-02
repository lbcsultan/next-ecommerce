import forge from 'node-forge';

export default function handler(req, res) {
  const algorithm = req.body.algorithm;
  const inputText = req.body.inputText;
  let hashValue;

  switch (algorithm) {
    case 'md5':
      var md = forge.md.md5.create();
      md.update(inputText);
      hashValue = md.digest().toHex();
      res.status(200).json({ hashValue: hashValue });
      return;
    case 'sha1':
      var md = forge.md.sha1.create();
      md.update(inputText);
      hashValue = md.digest().toHex();
      res.status(200).json({ hashValue: hashValue });
      return;
    case 'sha256':
      var md = forge.md.sha256.create();
      md.update(inputText);
      hashValue = md.digest().toHex();
      res.status(200).json({ hashValue: hashValue });
      return;
    case 'sha384':
      var md = forge.md.sha384.create();
      md.update(inputText);
      hashValue = md.digest().toHex();
      res.status(200).json({ hashValue: hashValue });
      return;
    case 'sha512':
      var md = forge.md.sha512.create();
      md.update(inputText);
      hashValue = md.digest().toHex();
      res.status(200).json({ hashValue: hashValue });
      return;
  }
}
