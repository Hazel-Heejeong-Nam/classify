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
      user = await db
        .collection('users')
        .findOneAndUpdate(
          { username: body.username },
          { $addToSet: { recommendations: body.recommendation } }
        )
      if (!user) {
        return res.status(401).json({
          error: `invalid username`,
        })
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
      let recs = await recommender(user, db)
      res.status(200).json({"recs":recs})
      break
  }
}

async function recommender(user, db) {
  console.log("Here comes the sun")

  var reccomendations = []

  var uimat = await db
        .collection('uimat')
        .find({name : "uimatrix"})
        .next()

  let uimatrix = uimat["data"]

  let user_to_ix = await db
      .collection('uimat')
      .find({ name : "user_to_ix"})
      .next()

  var uix = user_to_ix["data"][user.username]

  let class_to_ix = await db
    .collection('uimat')
    .find({ name : "classes_to_ix"})
    .next()

  
  if ('ratings' in user) {

    let class_prefix
    let course
    let rating
    let cobj

    // Find the user's highest rated classes
    var rated_classes = []

    for(const i in user.ratings) {
      let robj = user.ratings[i]

      class_prefix = robj.course.split(' ')[0]
      course = robj.course
      rating = Number(robj.rating)
      rated_classes.push([class_prefix, course, rating])
    }

    rated_classes.sort((a, b) => {a[2] > b[2]})
    console.log(rated_classes)

    // Recommend from similar classes
    for (const i in rated_classes) {
      class_prefix = rated_classes[i][0]
      course = rated_classes[i][1]
      rating = rated_classes[i][2]

      // Only consider those whose rating is >= 4
      if (rating >= 4) {
        cobj = await db
        .collection('classes')
        .find({ class_prefix: class_prefix})
        .next()

        let arr = []

        for (const j in cobj['classes'][course]['similar']) {
          let sim = cobj['classes'][course]['similar'][j]
          
          // Add reccomendation if similar enough
          if(sim.score > 0.2) {
            sim.score = rating*sim.score/5.
            arr.push([sim.class_prefix, sim.course, sim.score])
          }
        }

        if (arr.length > 0) {
          reccomendations.push([course, arr])
        }

      }

    }

  }

  console.log("Here goes the sun")
  
  return reccomendations
}