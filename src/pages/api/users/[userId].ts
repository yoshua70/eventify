import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(404).json({ error: "No user id provide." });
  }

  const user = await prisma.user
    .findUnique({
      where: { supabase_user_id: userId.toString() },
      include: {
        profile: true,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return res.status(200).json({ ...user });
}
