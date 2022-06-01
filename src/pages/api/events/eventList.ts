import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const eventHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventList = await prisma.event.findMany({
    where: {
      start: {
        gt: new Date(),
      },
    },
    orderBy: {
      start: "asc",
    },
  });

  if (!eventList)
    return res.status(500).json({ error: "Couldn't fetch event list" });

  res.status(200).json(eventList);
};

export default eventHandler;
