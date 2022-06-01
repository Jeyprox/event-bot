import { NextApiRequest, NextApiResponse } from "next";
import { Guild } from "../../../interfaces";

const guildHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
  });
  const guildList: Guild[] = await guildRes.json();
  res.status(200).json(guildList);
};

export default guildHandler;
