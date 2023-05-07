import { undashit } from "@/utils/helpers";
import { titleMapper } from "./NotionText";
import { block } from "./duper-renderer";

export default function NotionQuote({ block }: { block: block }) {
  const value = block.value;
  const id = undashit(`${value.id}`);
  const title = value.properties?.title;
  const size = value.format?.quote_size;
  const blockColor = value.format?.block_color;
  const fullClass = `duper-quote duper-quote-${size} duper-${blockColor}`;
  return (
    <blockquote id={`block-${id}`} className={fullClass}>
      {titleMapper({ title })}
    </blockquote>
  );
}
