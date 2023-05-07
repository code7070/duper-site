import NotionPageIcon from "@/components/Icons/NotionPageIcon";
import { titleMapper } from "./NotionText";
import { block } from "./duper-renderer";
import { undashit } from "@/utils/helpers";

export default function NotionCallout({
  block,
  BlockMapper,
}: {
  block: block;
  BlockMapper: any;
}) {
  const value = block.value;
  const format = value.format;
  const title = value.properties?.title;
  const blockColor = format?.block_color;
  const calloutClassName = `duper-callout duper-${blockColor}-callout`;
  const id = undashit(`${value.id}`);
  const icon = value.format?.page_icon;
  const content = value.content;

  let views = (
    <>
      {titleMapper({ title })}
      {content && content.map((c: any) => <BlockMapper key={c} blockId={c} />)}
    </>
  );

  let iconViews: any = <NotionPageIcon />;
  if (icon && icon?.length > 2)
    iconViews = (
      <picture>
        <img alt="Page Icon" src={`https://www.notion.so${icon}`} />
      </picture>
    );
  else if (icon) iconViews = icon;

  return (
    <div className={calloutClassName} id={`block-${id}`}>
      <div className="duper-callout-icon">{iconViews}</div>
      <div className="duper-callout-content">{views}</div>
    </div>
  );
}
