import Link from "next/link";
import getNotion from "./getNotion";
import { parsePageId } from "notion-utils";

type WrapperProps = {
  children: string | JSX.Element | JSX.Element[];
};

type Block = {
  id?: string;
  [key: string]: any;
};

export default function NotionRenderer({
  notionMap = { block: {}, collection_view: {}, collection: {} },
}) {
  const block = notionMap?.block;
  // console.log("C: ", notionMap);
  const { content: pageContent, id: parentId } = getNotion.pageContent(block);
  const blockLists = getNotion.blocksList(block);

  // console.log(blockLists);

  const Wrapper = (props: WrapperProps) => <div>{props.children}</div>;

  const Picture = ({ block }: any | string) => {
    const src = encodeURIComponent(block?.properties?.source?.[0]);
    const params = `?table=${block.parent_table}&id=${block.id}&cache=v2`;
    const fullSrc = `https://notion.so/image/${src}${params}`;
    if (src) return <img className="duper-picture" alt="hehe" src={fullSrc} />;
    return null;
  };

  const Header = ({ block }: any) => {
    let view = <div>{block?.properties?.title[0]}</div>;
    if (block.type === "header")
      view = <h2 className="duper-header">{block?.properties?.title[0]}</h2>;
    else if (block.type === "sub_header")
      view = (
        <h3 className="duper-sub-header">{block?.properties?.title[0]}</h3>
      );
    else if (block.type === "sub_sub_header")
      view = (
        <h4 className="duper-sub-sub-header">{block?.properties?.title[0]}</h4>
      );

    return <Wrapper>{view}</Wrapper>;
  };

  const PageLink = ({ block }: any) => {
    let link = `/${parentId}/${block.id}`;
    if (parentId === parsePageId("401f5338dec4448f9806022532f49787"))
      link = `/${block.id}`;
    return (
      <div>
        <Link href={link} className="duper-pagelink">
          {block?.properties?.title[0]}
        </Link>
      </div>
    );
  };

  const Button = ({ block }: any) => {
    const titleDisplay = getNotion.titleMapper(block);
    const style = block?.format?.block_color;
    return (
      <button type="button" className={`duper-button ${style}`}>
        {titleDisplay}
      </button>
    );
  };

  const Column = ({ block }: any) => {
    const width = `calc(100% * ${block?.format?.column_ratio || 1})`;
    // console.log("COLUMN: ", block);
    return (
      <div style={{ width }} className="flex-1">
        {/* {block?.id} */}
        {block?.content.map((b: any) => {
          const block = blockLists.find((f) => f.id === b);
          return <Block key={b} block={block} />;
        })}
      </div>
    );
  };

  const Columns = ({ block }: any) => {
    const content = block?.content;
    return (
      <Wrapper>
        <div className="flex gap-1 w-full">
          {content?.map((i: any) => {
            const block = blockLists.find((x) => x.id === i);
            return <Column key={i} block={block} />;
          })}
        </div>
      </Wrapper>
    );
  };

  const Callouts = ({ block }: any) => {
    return (
      <Wrapper>
        <div className="duper-callout">
          {block?.content?.map((x: any) => {
            const block = blockLists.find((i) => i.id === x);
            return <Block key={x} block={block} />;
          })}
        </div>
      </Wrapper>
    );
  };

  const Block = ({ block }: any) => {
    if (block.type === "page") return <PageLink block={block} />;
    // if (block.type === "page") return "";
    else if (`${block.type}`.includes("header"))
      return <Header key={block.id} block={block} />;
    else if (block.type === "column_list") return <Columns block={block} />;
    else if (block.type === "image") return <Picture block={block} />;
    else if (block.type === "quote") return <Button block={block} />;
    else if (block.type === "callout") return <Callouts block={block} />;

    const titleDisplay = getNotion.titleMapper(block);

    return (
      <Wrapper>
        <div>{titleDisplay}</div>
      </Wrapper>
    );
  };

  return pageContent?.map((i: any) => {
    let block: Block = {};
    block = blockLists.find((x) => x.id === i);
    if (!block) return "";

    return <Block key={block.id} block={block} />;
  });
}
