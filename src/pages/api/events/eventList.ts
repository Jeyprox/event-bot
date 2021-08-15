import { NextApiRequest, NextApiResponse } from "next";
import { EventItem } from "../../../common/types";

const mysql = require("serverless-mysql")({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

const eventHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId;
  if (!userId) return res.status(500).send({ error: "No user specified" });
  if (isNaN(Number(userId)))
    return res.status(500).send({ error: "UserId is not a number" });
  const results = await mysql.query(
    `SELECT * FROM events WHERE creator = ${userId} ORDER BY updated_at DESC`
  );
  if (!results.length)
    return res.status(500).json({ error: "No account found" });

  res.status(200).json(results);
};

export default eventHandler;
