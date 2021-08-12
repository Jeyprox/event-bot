import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
// import { Guild } from "../../../common/types";

const guildHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  const guildRes = await axios.get("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_SECRET}` },
  });
  console.log(guildRes);

  res.status(200).json(guildRes);
};

export default guildHandler;
