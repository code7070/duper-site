import { NotionAPI } from "notion-client";
import { parsePageId } from "notion-utils";

const notion = new NotionAPI();

export const notionAPI = {
  getPage: async (pageId: string) => {
    return await notion
      .getPage(parsePageId(pageId))
      .then((res: object) => res)
      .catch((err: any) => null);
  },
};
