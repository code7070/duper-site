import { undashit } from "@/utils/helpers";
import { titleMapper } from "./NotionText";
import { block } from "./duper-renderer";
import Link from "next/link";

export default function NotionBookmark({ block }: { block: block }) {
  const value = block.value;
  const id = undashit(`${value.id}`);
  const title = value.properties?.title;
  const link = `${value.properties?.link || ""}`;
  const desc = `${value.properties?.description || ""}`;
  const icon = `${value.format?.bookmark_icon || ""}`;

  const displayTitle = titleMapper({ title });

  return (
    <Link
      href={link}
      id={`block-${id}`}
      className="duper-bookmark duper-pageLink"
    >
      <h5 className="duper-bookmark-title">{displayTitle}</h5>
      <p className="duper-bookmark-desc">{desc}</p>
      <div className="duper-bookmark-link">
        <div className="duper-bookmark-icon">
          <img alt={`${displayTitle || ""}`} src={icon} />
        </div>
        <div className="duper-bookmark-linkName">{link}</div>
      </div>
    </Link>
  );
}
