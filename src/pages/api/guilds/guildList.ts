import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Guild } from "../../../common/types";

import { getToken } from "next-auth/jwt";

const mysql = require("serverless-mysql")({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

const tokenSecret = process.env.DISCORD_JWT_SECRET;

const guildHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret: tokenSecret!,
  });

  if (!token) return null;

  const guildRes = await axios.get("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${token!.accessToken}` },
  });

  if (guildRes.status !== 200)
    return res.status(500).json({ error: "Error while fetching guilds" });

  const filteredGuilds = guildRes.data.filter((guild: Guild) => {
    return guild.permissions === 2147483647;
  });

  if (!filteredGuilds.length)
    return res
      .status(500)
      .send({ error: "You are currently not part of any guilds." });
  res
    .status(200)
    .json(
      filteredGuilds.sort((a: Guild, b: Guild) => a.name.localeCompare(b.name))
    );
};

export default guildHandler;
