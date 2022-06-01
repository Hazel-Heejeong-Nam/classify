import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  await client.connect()
  const db = client.db('classify')
  let department = await db
    .collection('classes')
    .find({ department: req.query.dep })
    .next()
  if (!department) {
    return res.status(401).json({
      error: `invalid department`,
    })
  }
  res.status(200).json(Object.keys(department.classes))
}
