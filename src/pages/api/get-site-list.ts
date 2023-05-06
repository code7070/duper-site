import supabase from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies, method } = req;

  if (method === "GET") {
    const { data } = await supabase()
      .from("user")
      .select("id")
      .eq("username", cookies.username)
      .eq("token", cookies.token);
    if (data && data?.length > 0) {
      const userid = data?.[0]?.id || null;
      const { data: sites } = await supabase()
        .from("sites")
        .select()
        .eq("user_id", userid);
      return res.status(200).json({ sites });
    }
    return res
      .status(401)
      .json({ error: { message: "Tidak ada autentikasi" } });
  }

  return res.status(404).json({ error: { messages: "Not Found" } });
}
