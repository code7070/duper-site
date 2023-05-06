import { block } from "./duper-renderer";

export default function NotionVideo({ block }: { block: block }) {
  const value = block.value;
  const format = value.format;
  const properties = value.properties;
  const id = value.id;
  const display = format?.display_source;
  const source = properties?.source;

  return (
    <div className="duper-block" id={`block-${id}`}>
      <div className="duper-embed">
        {source && (
          <iframe
            style={{ aspectRatio: `${format?.block_aspect_ratio}` }}
            src={display}
          />
        )}
      </div>
    </div>
  );
}
