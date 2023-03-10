const { mixes } = require('./mixes.json');

export default function handler(req, res) {
  if (req.method == 'GET') {
    res.status(200).json(mixes);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
