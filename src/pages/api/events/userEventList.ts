import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const eventHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId;
  if (!userId) return res.status(500).send({ error: "No user specified" });

  const eventList = await prisma.event.findMany({
    where: {
      createdBy: {
        equals: String(userId),
      },
    },
  });

  if (!eventList)
    return res.status(500).json({ error: "Couldn't fetch event list" });

  res.status(200).json(eventList);
};

export default eventHandler;
