import supabase from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, cookies, query } = req;
  if (method === "GET") {
    console.log("API: ", cookies);
    const { username = "", token = "" } = cookies;
    const response = await supabase()
      .from("user")
      .select("id")
      .eq("username", username || query.username)
      .eq("token", token || query.token);
    return res.status(200).json(response);
  }
}
