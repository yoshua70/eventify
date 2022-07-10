import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma-client";
import supabase from "lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await supabase.auth.api.getUserByCookie(req, res);

  if (!user)
    return res.status(401).json({
      errors: {
        code: 401,
        message: "Unauthorized. User is not logged in on the server.",
      },
    });

  const userData = await prisma.user
    .findFirst({
      where: { email: req.body.email },
      select: {
        supabase_user_id: true,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  if (!(userData?.supabase_user_id === user.data?.id))
    return res.status(401).json({
      errors: {
        code: 401,
        message:
          "Unauthorized. You're not the user you try to update the information.",
      },
    });

  const userProfile = await prisma.user
    .update({
      where: { email: req.body.email },
      data: {
        profile: {
          upsert: {
            create: { username: req.body.username, bio: req.body.bio },
            update: { username: req.body.username, bio: req.body.bio },
          },
        },
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return res.status(200).json({ data: { ...userProfile } });
}
