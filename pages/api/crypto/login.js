import forge from 'node-forge';

export default function handler(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);

  res.status(200).json({ result: 'ok' });
}
