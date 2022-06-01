import { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { Guild, UserGuild } from "../../../interfaces";

const guildHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret: process.env.DISCORD_JWT_SECRET,
  });

  if (!token)
    return res
      .status(500)
      .json({ error: "No valid token for fetching guilds" });

  const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  });

  if (!guildRes.ok)
    return res.status(500).json({ error: "Error while fetching guilds" });

  const guildList: Guild[] = await guildRes.json();

  const filteredGuilds = guildList.filter((guild: Guild) => {
    return guild.permissions === 2147483647;
  });

  if (!filteredGuilds.length)
    return res
      .status(500)
      .send({ error: "You are currently not part of any guilds." });

  const botRes = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
  });
  const botGuilds = await botRes.json();

  const finalGuildList: UserGuild[] = filteredGuilds.map((guild: Guild) => {
    let isBotInGuild = false;
    if (botGuilds.length && botGuilds.find((g: Guild) => g.id === guild.id))
      isBotInGuild = true;
    return { ...guild, hasBot: isBotInGuild };
  });
  return res.status(200).json(
    finalGuildList.sort((a: UserGuild, b: UserGuild) => {
      return (
        (a.hasBot === b.hasBot ? 0 : a.hasBot ? -1 : 1) ||
        a.name.localeCompare(b.name)
      );
    })
  );
};

export default guildHandler;
