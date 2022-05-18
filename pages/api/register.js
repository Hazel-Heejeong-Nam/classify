import clientPromise from '../../lib/mongodb'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const client = await clientPromise
  await client.connect()
  const db = client.db('classify')
  switch (req.method) {
    case 'POST':
      let body = JSON.parse(req.body).data
      let emailExists = await db
        .collection('users')
        .find({ email: body.email })
        .next()
      if (emailExists)
        return res.status(202).send({
          message: 'This email already exists',
        })
      let usernameExists = await db
        .collection('users')
        .find({ username: body.username })
        .next()
      if (usernameExists)
        return res.status(202).send({
          message: 'This username already exists',
        })
      const password = await bcrypt.hash(body.password, 10)
      const newUser = {
        name: body.name,
        username: body.username,
        email: body.email,
        password: password,
        major: body.major,
        year: body.year,
      }
      await db.collection('users').insertOne(newUser)
      res.json({ status: 201 })
      break
  }
}
