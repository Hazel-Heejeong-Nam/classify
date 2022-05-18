import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  await client.connect()
  const db = client.db('classify')
  let body
  let user
  switch (req.method) {
    case 'POST':
      body = JSON.parse(req.body).data
      const courseRating = { course: body.course, rating: body.rating }
      user = await db
        .collection('users')
        .findOneAndUpdate(
          { username: body.username },
          { $addToSet: { ratings: courseRating } }
        )
      if (!user) {
        return res.status(401).json({
          error: `invalid username`,
        })
      }
      res.status(200).json()
      break
    case 'GET':
      body = JSON.parse(req.body).data
      user = await db
        .collection('users')
        .find({ username: body.username })
        .next()
      if (!user) {
        return res.status(401).json({
          error: `invalid username`,
        })
      }
      res.status(200).json(user.ratings)
      break
  }
}
