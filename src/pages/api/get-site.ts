import supabase from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies, method, query } = req;

  const getCheckLogin = async () => {
    return await supabase()
      .from("user")
      .select("id")
      .eq("username", cookies.username)
      .eq("token", cookies.token);
  };

  const checkSites = async (userid: string) => {
    const { data: sites } = await supabase()
      .from("sites")
      .select("id,domain,theme (id,name),is_active")
      .eq("user_id", userid)
      .eq("domain", query.domain);
    console.log("CHECK SITE: ", { userid, sites });
    if (sites && sites?.length > 0) return res.status(200).json({ sites });
    return res.status(404).json({ error: { message: "Site tidak ditemukan" } });
  };

  if (method === "GET" && query.domain) {
    const loginRes = await getCheckLogin();
    const user = loginRes && loginRes.data;
    if (user && user.length > 0) await checkSites(user[0].id);
    else
      return res
        .status(401)
        .json({ error: { message: "Tidak ada autentikasi", user } });
  }

  // return res.status(400).json({ error: { message: "Site gagal didapatkan" } });
}
