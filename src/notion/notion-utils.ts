import { fetchSplitbee } from "@/utils/helpers";

const notionUtils = {
  getBlockParent: (blocks: any) => {
    const parent = Object.values(blocks).slice(0, 1);
    return parent[0];
  },
  getPageContent: async (blocks: any) => {
    const objectBlocks = Object.values(blocks);
    const pageList = objectBlocks
      .filter(
        (i: any) => i.value.type === "page" && i.value.parent_table === "block"
      )
      .map((i: any) => i.value);

    const temp = pageList.slice(1);
    const mapper = temp.map(async (i) => await fetchSplitbee(i.id));

    const children = await Promise.all(mapper).then((res) => {
      return Object.values(res).map((x: any) => {
        const obj = Object.values(x)
          .map((i: any) => i.value)
          .filter((i: any) => i.type === "page");
        obj.splice(1, 1);
        return obj;
      });
    });

    return [{ ...pageList[0], children }];
  },
  getNotionSitemap: async (blocks: any) => {
    const processed = Object.values(blocks).map((i: any) => i);
    const parent = processed[0];
    const filtering = (p: any, i: any) =>
      p.value.id === i &&
      (p.value.type === "page" || p.value.type === "collection_view");

    // const children = parent.value.content
    //   .filter((c: any) => processed.find((p: any) => filtering(p, c)))
    //   .map((i: any) => processed.find((p: any) => filtering(p, i)));

    // const children = processed
    //   .slice(1)
    //   .filter(
    //     (c: any) =>
    //       c.value.type === "page" || c.value.type === "collection_view"
    //   );

    return { parent };
  },
};

export default notionUtils;
