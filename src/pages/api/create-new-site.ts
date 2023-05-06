import { slugify2 } from "@/utils/helpers";
import supabase from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { NotionAPI } from "notion-client";
import { parsePageId } from "notion-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, cookies } = req;

  const getPageNotion = async () => {
    const api = new NotionAPI();
    const pageId = parsePageId(`${query.notionId}`);
    const page = await api.getPage(pageId);
    return page;
  };

  const getCheckLogin = async () => {
    return await supabase()
      .from("user")
      .select("id")
      .eq("username", cookies.username)
      .eq("token", cookies.token);
  };

  const callNotion = async () => {
    const { collection: pColl, block } = await getPageNotion();
    const valBlock = Object.values(block);

    const getTitle = (fullBlocks: any) =>
      `${fullBlocks?.value?.properties?.title[0][0]}`;

    const slugger = (fullBlocks: any) => slugify2(getTitle(fullBlocks));

    const pageChildren = valBlock
      .filter(
        (i: any) =>
          (i?.value?.type === "page" ||
            i?.value?.type === "collection_view_page") &&
          i?.value?.parent_table === "block"
      )
      .map((i: any) => {
        let children: any = false;
        let path = slugger(i);
        let title = getTitle(i);
        if (i.value.type === "collection_view_page") {
          const collId = i.value.collection_id;
          const name = `${pColl[collId]?.value.name[0][0]}`;
          path = slugify2(name);
          title = name;
          children = valBlock
            .filter((a: any) => a?.value?.parent_id === collId)
            .map((x: any) => ({
              id: x.value.id,
              path: slugger(x),
              title: getTitle(x),
            }));
        }
        const newItem = { id: i.value.id, path, children, title };
        return newItem;
      });

    return pageChildren;
  };

  if (!query?.notionId)
    return res.status(400).json({ error: { message: "Notion ID Required" } });

  const { data: sites, error } = await supabase()
    .from("sites")
    .select("domain")
    .eq("domain", `${query.domain}`);

  if (sites && sites.length > 0)
    return res
      .status(400)
      .json({ error: { message: "Domain tidak tersedia" } });
  else if (sites && sites.length < 1) {
    const loginRes = await getCheckLogin();
    const user = loginRes && loginRes.data;
    if (user && user.length > 0) {
      const notionMap = await callNotion();
      const userId = user[0].id;
      const body = {
        user_id: userId,
        page_id: query.notionId,
        domain: query.domain,
        sitemap: notionMap,
      };
      const { status, data } = await supabase()
        .from("sites")
        .insert(body)
        .select();
      if (status === 201) return res.status(200).json({ data });
      return res
        .status(400)
        .json({ error: { message: "Gagal membuat site, silakan coba lagi" } });
    } else
      return res
        .status(401)
        .json({ error: { message: "Tidak ada autentikasi" } });
  }
  return res
    .status(400)
    .json({ error: { message: "Pembuatan website gagal. Silakan coba lagi" } });
}
