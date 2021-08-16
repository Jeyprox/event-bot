import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Guild } from "../../../common/types";

const mysql = require("serverless-mysql")({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

const guildHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId;
  if (!userId) return res.status(500).send({ error: "No user specified" });
  if (isNaN(Number(userId)))
    return res.status(500).send({ error: "UserId is not a number" });
  const results = await mysql.query(
    `SELECT access_token FROM accounts WHERE user_id = ${userId}`
  );
  if (!results.length)
    return res.status(500).json({ error: "No account found" });

  const guildRes = await axios.get("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${results[0].access_token}` },
  });
  const filteredGuilds = guildRes.data.filter((guild: Guild) => {
    return guild.permissions === 2147483647;
  });

  if (!filteredGuilds.length)
    return res
      .status(500)
      .send({ error: "You are currently not part of any guilds." });

  await mysql.end();
  res
    .status(200)
    .json(
      filteredGuilds.sort((a: Guild, b: Guild) => a.name.localeCompare(b.name))
    );
};

export default guildHandler;
