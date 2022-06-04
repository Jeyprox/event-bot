import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../../interfaces";
import prisma from "../../../lib/prisma";

const eventHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    eventName,
    eventDate,
    details,
    category,
    userId,
  }: {
    eventName: string;
    eventDate: Date;
    details: string;
    category: Category;
    userId: string;
  } = req.body;
  const newEvent = await prisma.event.create({
    data: {
      name: eventName,
      date: eventDate,
      details: details,
      categoryId: category.id,
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
