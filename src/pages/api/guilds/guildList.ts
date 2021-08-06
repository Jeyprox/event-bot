import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import mysql from "mysql";

import { Guild } from "../../../common/types";

const con = mysql.createConnection(process.env.DATABASE_URL + "");

const guildHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId;

  con.query(
    `SELECT access_token FROM accounts WHERE user_id = ${userId}`,
    async (error, results) => {
      if (error) throw error;
      if (!results.length) {
        res.status(500).json({ error: "No account found" });
        return;
      }

      const guildRes = await axios.get(
        "https://discord.com/api/users/@me/guilds",
        { headers: { Authorization: `Bearer ${results[0].access_token}` } }
      );

      const filteredGuilds = guildRes.data.filter((guild: Guild) => {
        return guild.permissions === 2147483647;
      });

      res.status(200).json(filteredGuilds);
    }
  );
};

export default guildHandler;
