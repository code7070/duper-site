import { block } from "./duper-renderer";

export default function NotionCode({ block }: { block: block }) {
  const value = block.value;
  const properties = value.properties;
  const id = value.id;
  const lang = properties?.language;

  return (
    <div className="duper-block" id={`block-${id}`}>
      <pre lang={`${lang}`} className="duper-code">
        <code>{properties?.title}</code>
      </pre>
    </div>
  );
}
