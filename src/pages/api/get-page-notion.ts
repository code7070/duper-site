import { NextApiRequest, NextApiResponse } from "next";
import { NotionAPI } from "notion-client";
import { parsePageId } from "notion-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  if (method === "GET") {
    const api = new NotionAPI();
    const pageId = parsePageId(`${query.id}`);
    const page = await api.getPage(pageId);

    res.status(200).json(page);
  }
}
