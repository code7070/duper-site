import HeaderNotionSite from "@/components/notion-site/header";
import NotionText from "./NotionText";
import NotionTodoList from "./NotionTodoList";
import NotionBulletedList from "./NotionBulletedList";
import { NotionColumn, NotionColumnList } from "./NotionColumn";
import NotionHeading from "./NotionHeading";
import NotionCallout from "./NotionCallout";
import NotionDivider from "./NotionDivider";
import NotionImage from "./NotionImage";
import NotionPageLink from "./NotionPageLink";
import NotionQuote from "./NotionQuote";
import NotionVideo from "./NotionVideo";
import NotionEmbed from "./NotionEmbed";
import NotionCode from "./NotionCode";
import { useEffect, useState } from "react";
import NotionBookmark from "./NotionBookmark";
import NotionFile from "./NotionFile";

type notionMap = {
  block?: object;
  collection?: object;
  collection_query?: object;
  collection_view?: object;
  notion_user?: object;
  signed_urls?: object;
  space?: object;
  [key: string]: any;
};

export type block = {
  role?: string;
  value: {
    id?: string;
    type?: string;
    content?: Array<object>;
    properties?: {
      title: Array<any>;
      checked?: Array<any>;
      caption?: Array<any>;
      source?: Array<any>;
      language?: Array<any>;
      link?: Array<any>;
      description?: Array<any>;
      size?: Array<any>;
    };
    format?: {
      column_ratio?: number;
      block_color?: string;
      page_icon?: string;
      alias_pointer?: { id?: string; spaceId?: string; table?: string };
      copied_from_pointer?: string;
      quote_size?: "large";
      display_source?: string;
      block_height?: string;
      block_aspect_ratio?: number;
      bookmark_icon?: string;
    };
    [key: string]: any;
  };
};

type SignedUrls = {
  [index: string]: any;
};

export const BlockRenderer = ({
  block,
  blocks,
  signedUrls,
}: {
  block: block;
  blocks: Array<any>;
  signedUrls: SignedUrls;
}) => {
  if (!block.value.content) return <div>No children here</div>;

  const BlockMapper = ({ blockId }: { blockId: string }) => {
    // finding content id into block
    const block: block = blocks.find((i: any) => i.value.id === blockId);
    if (!block) return <></>;

    const value = block.value;
    const type = value.type;
    const title = value.properties?.title || type;
    const id = value.id;

    if (type === "column_list")
      return <NotionColumnList block={block} BlockMapper={BlockMapper} />;
    else if (type === "column")
      return <NotionColumn block={block} BlockMapper={BlockMapper} />;
    else if (type === "callout")
      return <NotionCallout block={block} BlockMapper={BlockMapper} />;
    else if (type?.includes("header")) return <NotionHeading block={block} />;
    else if (type === "text") return <NotionText block={block} />;
    else if (type === "image")
      return (
        <NotionImage block={block} signedUrls={signedUrls[`${value.id}`]} />
      );
    else if (type === "copy_indicator") return <></>;
    else if (type === "to_do") return <NotionTodoList block={block} />;
    else if (type === "bulleted_list")
      return <NotionBulletedList block={block} />;
    else if (type === "divider") return <NotionDivider block={block} />;
    else if (type === "page") return <NotionPageLink block={block} />;
    else if (type === "alias")
      return <NotionPageLink block={block} isAlias blocks={blocks} />;
    else if (type === "quote") return <NotionQuote block={block} />;
    else if (type === "video") return <NotionVideo block={block} />;
    else if (type === "embed") return <NotionEmbed block={block} />;
    else if (type === "code") return <NotionCode block={block} />;
    else if (type === "bookmark") return <NotionBookmark block={block} />;
    else if (type === "file")
      return (
        <NotionFile block={block} signedUrls={signedUrls[`${value.id}`]} />
      );
    else if (block)
      return (
        <div className="duper-block" id={`block-${id}`}>
          {type}
          <br />
          {title}
        </div>
      );
    return <div>Unknown Block</div>;
  };

  return (
    <div>
      {block.value.content.map((c: any) => {
        return <BlockMapper key={c} blockId={c} />;
      })}
    </div>
  );
};

export default function DuperRenderer({
  notionMap,
  dataSite,
}: {
  notionMap: notionMap;
  dataSite: any;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const blocks = Object.values(notionMap?.block || {});
  const signedUrls = notionMap?.signed_urls || {};
  const parent: block = blocks[0];
  if (!blocks || blocks.length < 1) return <></>;

  return (
    <>
      {/* <HeaderNotionSite dataSite={dataSite} /> */}
      <section className="duper-page">
        innerWidth: {width}px
        <BlockRenderer block={parent} blocks={blocks} signedUrls={signedUrls} />
      </section>
    </>
  );
}
