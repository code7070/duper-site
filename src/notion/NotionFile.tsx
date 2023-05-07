import { undashit } from "@/utils/helpers";
import { block } from "./duper-renderer";
import Link from "next/link";
import { titleMapper } from "./NotionText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileCode,
  faFileExcel,
  faFilePdf,
  faFileVideo,
  faFileWord,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

export default function NotionFile({
  block,
  signedUrls,
}: {
  block: block;
  signedUrls?: any;
}) {
  const value = block.value;
  const properties = value.properties;
  const title = `${properties?.title}`;
  const id = undashit(`${value.id}`);
  const size = `${properties?.size}`;
  const fileExtension = `${title.split(".").pop()}`;

  let fileIcon: any = <FontAwesomeIcon icon={faFile} />;

  if (["png", "jpg", "jpeg"].includes(fileExtension))
    fileIcon = <FontAwesomeIcon icon={faImage} />;
  else if (["mp4", "webm", "mpeg"].includes(fileExtension))
    fileIcon = <FontAwesomeIcon icon={faFileVideo} />;
  else if (["html", "js", "jsx", "css"].includes(fileExtension))
    fileIcon = <FontAwesomeIcon icon={faFileCode} />;
  else if (["pdf"].includes(fileExtension))
    fileIcon = <FontAwesomeIcon icon={faFilePdf} />;
  else if (["doc", "docx"].includes(fileExtension))
    fileIcon = <FontAwesomeIcon icon={faFileWord} />;
  else if (["xls", "xlsx"].includes(fileExtension))
    fileIcon = <FontAwesomeIcon icon={faFileExcel} />;

  return (
    <Link
      href={signedUrls}
      target="_blank"
      className="duper-file"
      id={`block-${id}`}
    >
      <div className="flex gap-2">
        <div className="w-4">{fileIcon}</div>
        <div title={title} className="duper-filename">
          {title}
        </div>
      </div>
      <div title={size} className="duper-filesize">
        {size}
      </div>
    </Link>
  );
}
