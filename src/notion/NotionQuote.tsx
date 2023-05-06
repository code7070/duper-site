import { titleMapper } from "./NotionText";
import { block } from "./duper-renderer";

export default function NotionQuote({ block }: { block: block }) {
  const value = block.value;
  const id = value.id;
  const title = value.properties?.title;
  const size = value.format?.quote_size;
  const blockColor = value.format?.block_color;
  return (
    <div className="duper-block" id={`block-${id}`}>
      <blockquote className={`duper-quote quote-${size} duper-${blockColor}`}>
        {titleMapper({ title })}
      </blockquote>
    </div>
  );
}
