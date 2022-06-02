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
        ratings: [],
        recommendations: { 'CS 35L': 1 },
      }

      let user_to_ix = await db
        .collection('uimat')
        .find({ name : "user_to_ix"})
        .next()

      console.log(Object.keys(user_to_ix["data"]).length)

      var update = { "$set": {} }
  
      update["$set"]["data." + body.username] = Object.keys(user_to_ix["data"]).length

      let r2 = await db
      .collection('uimat')
      .findOneAndUpdate(
        { name: "user_to_ix" },
        update
      )

      r2 = await db
      .collection('uimat')
      .findOneAndUpdate(
        { name: "uimatrix" },
        { $push : {data : Array(2375).fill(0)}}
      )

      if (!r2) {
        console.log("Error in updating uimatrix")
      }

      await db.collection('users').insertOne(newUser)
      res.json({ status: 201 })
      break
  }
}
