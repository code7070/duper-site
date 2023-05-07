import { undashit } from "@/utils/helpers";
import { block } from "./duper-renderer";

export default function NotionImage({
  block,
  signedUrls,
}: {
  block: block;
  signedUrls: any;
}) {
  const value = block.value;
  const id = undashit(`${value.id}`);
  const properties = value.properties;
  const title = `${properties?.title}`;
  const caption = `${properties?.caption}`;
  const format = value.format;
  const src = signedUrls;
  const srcdisplay = `${format?.display_source}`;

  return (
    <div className="duper-image" id={`block-${id}`}>
      <img alt={title} src={src || srcdisplay} />
      <figcaption className="duper-caption">{caption}</figcaption>
    </div>
  );
}
