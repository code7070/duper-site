import { undashit } from "@/utils/helpers";
import { block } from "./duper-renderer";
import { useState } from "react";

export default function NotionHeading({
  block,
  BlockMapper,
}: {
  block: block;
  BlockMapper: any;
}) {
  const [open, setOpen] = useState(false);

  const value = block.value;
  const type = value.type;
  const title = value.properties?.title?.[0] || type;
  const id = undashit(`${value.id}`);
  const isToggle = value.format?.toggleable;
  const content = value.content;

  const toggle = () => setOpen(!open);

  let headViews = (
    <h2 className="duper-heading1" id={`block-${id}`}>
      {title}
    </h2>
  );

  if (type === "sub_header")
    headViews = (
      <h3 className="duper-heading2" id={`block-${id}`}>
        {title}
      </h3>
    );
  else if (type === "sub_sub_header")
    headViews = (
      <h4 className="duper-heading3" id={`block-${id}`}>
        {title}
      </h4>
    );

  if (isToggle)
    return (
      <div
        className={`duper-toggle ${open ? "duper-toggle-open" : ""}`}
        id={`block-${id}`}
      >
        <button className="duper-toggle_head" onClick={toggle}>
          <span className="duper-toggle_arrow">‣</span>
          <div>{headViews}</div>
        </button>
        {content ? (
          <div className="duper-toggle_content">
            {content.map((c: any) => (
              <BlockMapper key={c} blockId={c} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  return headViews;
}
