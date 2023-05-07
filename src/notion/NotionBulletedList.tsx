import { undashit } from "@/utils/helpers";
import { block } from "./duper-renderer";

export default function NotionBulletedList({
  block,
  list,
}: {
  block: block;
  list?: any;
}) {
  const value = block && block.value;
  const title = value?.properties?.title;
  const id = undashit(`${value?.id}`);

  return (
    <div className="duper-bullet-list" id={`block-${id}`}>
      <div className="duper-bullet-list-inner">
        <span>•</span>
        <span>{title}</span>
      </div>
    </div>
  );
}
