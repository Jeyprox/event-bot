import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const eventHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventName, eventDate, details, category, userId } = req.body;
  const newEvent = await prisma.event.create({
    data: {
      name: eventName,
      date: eventDate,
      details: details,
      category: {
        connect: {
          id: category,
        },
      },
      createdBy: userId,
    },
  });
  if (newEvent) {
    res.status(200).json({
      message: "Event created successfully",
      data: newEvent,
    });
  } else {
    res.status(500).json({
      error: "Event creation failed",
    });
  }
};

export default eventHandler;
