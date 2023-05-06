import Checkbox from "@/components/Icons/CheckBox";
import { block } from "./duper-renderer";
import CheckedBox from "@/components/Icons/CheckedBox";

export default function NotionTodoList({ block }: { block: block }) {
  const value = block.value;
  const type = value.type;
  const title = value.properties?.title;
  const checked = value.properties?.checked;
  const id = value.id;

  const isChecked = checked && checked.length > 0 && checked[0][0] === "Yes";
  const checkedStatus = isChecked ? "checked" : "unchecked";

  let icon = <Checkbox />;
  if (isChecked) icon = <CheckedBox />;

  return (
    <div className={`duper-todo-list ${checkedStatus}`} id={`block-${id}`}>
      <div className="duper-todo-list-inner">
        <span className="duper-todo-list-icon">{icon}</span>
        <span className="duper-todo-list-text">{title}</span>
      </div>
    </div>
  );
}
