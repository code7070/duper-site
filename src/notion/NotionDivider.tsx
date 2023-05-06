import { block } from "./duper-renderer";

export default function NotionDivider({ block }: { block: block }) {
  return (
    <div className="duper-divider">
      <div className="duper-divider-inside" role="separator" />
    </div>
  );
}
