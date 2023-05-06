import { randomString } from "@/utils/helpers";
import supabase from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user?: object;
  error?: object;
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, method } = req;
  if (method === "POST") {
    const bodyparsed = JSON.parse(body);

    const token = randomString(16);
    const { status, data } = await supabase()
      .from("user")
      .update({ token })
      .eq("username", bodyparsed?.username)
      .eq("password", bodyparsed.password)
      .select("username,email,token");
    if (data && data.length > 0)
      return res.status(status).json({ user: data?.[0] });
  }

  res.status(400).json({ error: { message: "Login is Not Allowed" } });
}
