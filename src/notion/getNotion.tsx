import { isArrayLen, slugify } from "@/utils/helpers";
import Link from "next/link";
import { parsePageId } from "notion-utils";

const getNotion = {
  pageContent: (notionBlock = {}) => {
    if (Object.values(notionBlock).length < 1) return [];
    const objValues: any = Object.values(notionBlock);
    const id = objValues[0].value.id;
    return (
      objValues.filter((i: any) => i.value?.id === parsePageId(id))[0]?.value ||
      null
    );
  },
  blocksList: (blocks = {}) => {
    return Object.values(blocks)
      .filter((i: any) => i.role !== "none")
      .map((i: any) => i.value);
  },
  titleMapper: (block: any = {}) => {
    const title = block?.properties?.title || [];

    let view = title.map((i: any, index: number) => {
      let word = i[0];
      const initTag = i[1];

      let classType = "";
      let isLink = false;

      if (block.type === "quote") {
        console.log("QUOTE: ", initTag);
        initTag.map((zz: any) => {
          let tags = "";
          if (zz[0] === "b") tags = "font-bold";
          else if (zz[0] === "i") tags = "italic";
          else if (zz[0] === "a") isLink = zz;
          classType = `${classType} ${tags}`;
          return zz;
        });
      }

      if (isLink)
        return (
          <Link
            key={index}
            className={`${classType} mx-[1px]`}
            href={isLink[1]}
          >
            {word}
          </Link>
        );

      return (
        <span key={index} className={classType}>
          {word}
        </span>
      );
    });

    return view;
  },
  pageMap: (block = {}) => {
    if (!block) return null;
    const obval = Object.values(block);
    const pageId = parsePageId("401f5338dec4448f9806022532f49787");
    if (obval.length < 1) return null;
    return obval
      .filter(
        (i: any) => i?.value?.type === "page" && i?.value?.parent_id === pageId
      )
      .map((i: any) => i.value);
  },
  pageMapNav: (block = {}) => {
    const blockmap: any = getNotion.pageMap(block);
    if (isArrayLen(blockmap))
      return blockmap.map((blockItem: any) => {
        const name = blockItem?.properties?.title?.[0][0] || null;
        return { pageId: blockItem.id || null, name, path: slugify(name) };
      });
    return null;
  },
};

export default getNotion;
