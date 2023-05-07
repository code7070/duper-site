import { undashit } from "@/utils/helpers";
import { titleMapper } from "./NotionText";
import { block } from "./duper-renderer";
import Link from "next/link";
import { useState } from "react";

export default function NotionToggle({
  block,
  BlockMapper,
}: {
  block: block;
  BlockMapper: any;
}) {
  const [open, setOpen] = useState(false);
  const value = block.value;
  const id = undashit(`${value.id}`);
  const title = value.properties?.title;
  const content = value.content;
  const caption = value.properties?.caption;
  const link = `${value.properties?.link || ""}`;

  const titleDisplay = titleMapper({ title });

  const toggleOpen = () => setOpen(!open);
  const classOpen = open ? "duper-toggle-open" : "";

  return (
    <div className={`duper-toggle ${classOpen}`} id={`block-${id}`}>
      <button className="duper-toggle_head" onClick={toggleOpen}>
        <span className="duper-toggle_arrow">‣</span>
        <div>{titleDisplay}</div>
      </button>
      {content ? (
        <div className="duper-toggle_content">
          {content.map((c: any) => (
            <BlockMapper key={c} blockId={c} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
