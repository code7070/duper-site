import Link from "next/link";
import { block } from "./duper-renderer";

export const titleMapper = ({ title }: { title: any }) =>
  title?.map((t: any, index: number) => {
    let words = t[0];
    let properties: Array<any> = [];
    let link = false;

    if (t.length > 1) {
      const propertiesLoop = t[1];
      propertiesLoop.map((prop: any) => {
        if (prop[0] === "a") link = prop[1];
        else if (prop[0] === "h") {
          properties.push("duper-highlighted");
          properties.push(`duper-${prop[1]}`);
        } else if (prop[0] === "b") properties.push("duper-strong");
        else if (prop[0] === "i") properties.push("duper-italic");
        else if (prop[0] === "_") properties.push("duper-underline");
      });
    }

    const className = properties.join(" ");

    if (link)
      return (
        <Link key={index} href={link} className={className}>
          {words}
        </Link>
      );

    return (
      <span key={index} className={className}>
        {words}
      </span>
    );
  });

export default function NotionText({ block }: { block: block }) {
  const value = block.value;
  const title = value.properties?.title;
  const id = value.id;

  let blockColor = value?.format?.block_color || "";

  return (
    <div id={`block-${id}`} className={`duper-text duper-${blockColor}`}>
      <p className="duper-text-inner">
        <span className="duper-semantic-string">{titleMapper({ title })}</span>
      </p>
    </div>
  );
}
