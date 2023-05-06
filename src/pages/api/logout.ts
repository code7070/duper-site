import supabase from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies, method } = req;
  if (method === "GET") {
    const { status } = await supabase()
      .from("user")
      .update({ token: null })
      .eq("username", cookies.username)
      .eq("token", cookies.token);
    if (status === 204) res.status(200).json({ status: 200 });
  }
  res.status(400);
}
