import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const mysql = require("serverless-mysql")({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

const guildHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const guildId = req.query.guildId;
  if (!guildId) return res.status(500).send({ error: "No serverId specified" });
  if (isNaN(Number(guildId)))
    return res.status(500).send({ error: "ServerId has to be a number" });

  const results = await mysql.query(
    `SELECT * FROM servers WHERE server_id = ${guildId}`
  );
  if (!results.length) {
    await mysql.query(`INSERT INTO servers (server_id) VALUES ('${guildId}')`);
    return res.status(200).json({ server_id: guildId });
  }

  const guildInfo = await axios.get(
    `https://discord.com/api/guilds/${guildId}`,
    {
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    }
  );

  if (!guildInfo) return res.status(500).json({ error: "Server not found" });

  res.status(200).json({ guildInfo: guildInfo.data, guildSettings: results });
};
export default guildHandler;
