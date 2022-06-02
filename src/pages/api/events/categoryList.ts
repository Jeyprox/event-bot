import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const eventHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const categoryList = await prisma.category.findMany();

  if (!categoryList)
    return res.status(500).json({ error: "Couldn't fetch event list" });

  res.status(200).json(categoryList);
};

export default eventHandler;
