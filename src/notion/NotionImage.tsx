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
  const title = `${value.properties?.title}`;
  const src = signedUrls;
  // return <div>{type}</div>;
  return <img alt={title} id={`block-${id}`} src={src} />;
}
