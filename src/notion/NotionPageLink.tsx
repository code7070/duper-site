import Link from "next/link";
import { block } from "./duper-renderer";
import NotionPageIcon from "@/components/Icons/NotionPageIcon";
import LinkIndicator from "@/components/Icons/LinkIndicator";

export default function NotionPageLink({
  block,
  isAlias,
  blocks,
}: {
  block: block;
  isAlias?: boolean;
  blocks?: Array<any>;
}) {
  let targetBlock: block = block;
  if (isAlias && blocks) {
    const aliasPointer = block.value.format?.alias_pointer?.id;
    targetBlock = blocks.find((b: block) => b.value.id === aliasPointer);
    if (!targetBlock) return <></>;
  }

  const value = targetBlock.value;
  const id = value.id;
  const title = value.properties?.title;
  const icon = value.format?.page_icon;

  let iconViews: any = <NotionPageIcon />;
  if (icon && icon?.length > 2)
    iconViews = (
      <picture>
        <img alt="Page Icon" src={`https://www.notion.so${icon}`} />
      </picture>
    );
  else if (icon) iconViews = icon;

  return (
    <Link id={`block-${id}`} className="duper-pageLink" href={`/${id}`}>
      <div className="duper-pageLink-content">
        <span className="duper-pageLink-icon">
          {iconViews}
          {isAlias && (
            <span className="absolute right-0 bottom-0">
              <LinkIndicator />
            </span>
          )}
        </span>
        <span className="duper-pageLink-inner">{title}</span>
      </div>
    </Link>
  );
}
