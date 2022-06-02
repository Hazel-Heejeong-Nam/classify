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
      const courseRating = { year: body.year, quarter: body.quarter, course: body.course, rating: body.rating }
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
      
      let user_to_ix = await db
        .collection('uimat')
        .find({ name : "user_to_ix"})
        .next()

      var uix = user_to_ix["data"][body.username]

      let class_to_ix = await db
        .collection('uimat')
        .find({ name : "classes_to_ix"})
        .next()

      var cix = class_to_ix["data"][body.course]

      var update = { "$set": {} }
  
      update["$set"]["data."+uix+"."+cix] = Number(body.rating)
  
      let r2 = await db
      .collection('uimat')
      .findOneAndUpdate(
        { name: "uimatrix" },
        update
      )

      if (!r2) {
        console.log("Error in updating uimatrix")
      }

      res.status(200).json()
      break
    case 'GET':
      user = await db
        .collection('users')
        .find({ username: req.query.username })
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
