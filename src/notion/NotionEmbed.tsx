import { undashit } from "@/utils/helpers";
import { titleMapper } from "./NotionText";
import { block } from "./duper-renderer";

export default function NotionEmbed({ block }: { block: block }) {
  const value = block.value;
  const format = value.format;
  const properties = value.properties;
  const id = undashit(`${value.id}`);
  const display = format?.display_source;
  const source = properties?.source;
  const height = format?.block_height;

  return (
    <div className="duper-block" id={`block-${id}`}>
      <div className="duper-embed">
        {source && <iframe height={height} src={display} />}
      </div>
    </div>
  );
}
