import { undashit } from "@/utils/helpers";
import { block } from "./duper-renderer";

export default function NotionVideo({ block }: { block: block }) {
  const value = block.value;
  const format = value.format;
  const properties = value.properties;
  const id = undashit(`${value.id}`);
  const display = format?.display_source;
  const source = properties?.source;
  const ratio = format?.block_aspect_ratio;

  return (
    <div className="duper-embed" id={`block-${id}`}>
      {source && <iframe style={{ aspectRatio: `1/${ratio}` }} src={display} />}
      <figcaption></figcaption>
    </div>
  );
}
