import clientPromise from '../../lib/mongodb'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken-esm'

export default async function handler(req, res) {
  const client = await clientPromise
  await client.connect()
  const db = client.db('classify')
  switch (req.method) {
    case 'POST':
      let body = JSON.parse(req.body)
      const { username, password } = body.data
      const user = await db
        .collection('users')
        .find({ username: username })
        .next()
      const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.password)
      if (!user || !passwordCorrect) {
        return res.status(401).json({
          error: `invalid username or password`,
        })
      }
      const tokenObjects = {
        username: user.username,
        id: user._id,
      }
      const token = jwt.sign(tokenObjects, 'classify')
      res.status(200).json({ token: token, username: username })
      break
  }
}
