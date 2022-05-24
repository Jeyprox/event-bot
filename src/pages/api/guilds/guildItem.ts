import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const guildHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const guildId = req.query.guildId;
  if (!guildId) return res.status(500).send({ error: "No serverId specified" });
  if (isNaN(Number(guildId)))
    return res.status(500).send({ error: "ServerId has to be a number" });

  let dbRes = await prisma.server.findFirst({
    where: {
      id: {
        equals: String(guildId),
      },
    },
  });
  if (dbRes == null) {
    dbRes = await prisma.server.create({
      data: {
        id: String(guildId),
      },
    });
  }

  const guildRes = await fetch(`https://discord.com/api/guilds/${guildId}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
  });
  const guildInfo = await guildRes.json();

  if (!guildInfo) return res.status(500).json({ error: "Server not found" });

  res.status(200).json({ guildInfo, guildSettings: dbRes });
};
export default guildHandler;
