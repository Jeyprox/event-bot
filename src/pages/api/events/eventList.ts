import { add } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const eventHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  const eventList = await prisma.event.findMany({
    where: {
      date: {
        gt: add(new Date(), { hours: -4 }),
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  if (!eventList)
    return res.status(500).json({ error: "Couldn't fetch event list" });

  res.status(200).json(eventList);
};

export default eventHandler;
