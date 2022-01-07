import { connectToDatabase } from "../../utils/connectDB";

export default async function handler(req, res) {
  let q = req.query;

  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ [q.sortBy]: q.sortOrder === "asc" ? 1 : -1 })
    .skip((parseInt(q.pageNo) - 1) * parseInt(q.pageSize))
    .limit(parseInt(q.pageSize))
    .toArray();

  const totalCount = await db.collection("movies").count();

  /* const x = await db.collection("movies").aggregate([
    {
      $limit: 2,
    },
  ]).pretty();

  console.log(x);
  console.log(111);
  console.log(totalCount); */
  res.json({ data: movies, totalCount });
}
