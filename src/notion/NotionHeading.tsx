import { block } from "./duper-renderer";

export default function NotionHeading({ block }: { block: block }) {
  const value = block.value;
  const type = value.type;
  const title = value.properties?.title?.[0] || type;
  const id = value.id;

  if (type === "sub_header")
    return (
      <h3 className="duper-heading1" id={`block-${id}`}>
        {title}
      </h3>
    );
  else if (type === "sub_sub_header")
    return (
      <h4 className="duper-heading2" id={`block-${id}`}>
        {title}
      </h4>
    );
  return (
    <h2 className="duper-heading1" id={`block-${id}`}>
      {title}
    </h2>
  );
}
