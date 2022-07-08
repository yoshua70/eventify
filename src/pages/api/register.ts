import prisma from "lib/prisma-client";
import supabase from "lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  let { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) return res.status(401).json({ error: error.message });

  // We need to create a new user in our supabase database
  // that matches the one created for the supabase auth
  // since we can't query the later.

  const newUser = await prisma.user.create({
    data: {
      email: user?.email!,
      supabase_user_id: user?.id!,
    },
  });

  return res.status(200).json({ user: user });
}
