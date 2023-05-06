import { block } from "./duper-renderer";

const NotionColumn = ({
  block,
  BlockMapper,
}: {
  block: block;
  BlockMapper: any;
}) => {
  const value = block.value;
  const type = value.type;
  const title = value.properties?.title?.[0] || type;
  const content = value.content;
  const ratio = value.format?.column_ratio;
  const width = `calc(100% * ${ratio})`;
  const id = value.id;

  let views = content
    ? content.map((c: any) => <BlockMapper key={c} blockId={c} />)
    : title;

  return (
    <div className="duper-column" style={{ width }} id={`block-${id}`}>
      {views}
    </div>
  );
};

const NotionColumnList = ({
  block,
  BlockMapper,
}: {
  block: block;
  BlockMapper: any;
}) => {
  const value = block.value;
  const content = value.content;
  const id = value.id;

  return (
    <div className="duper-columnList" id={`block-${id}`}>
      {content?.map((c: any) => (
        <BlockMapper key={c} blockId={c} />
      ))}
    </div>
  );
};

export { NotionColumn, NotionColumnList };
