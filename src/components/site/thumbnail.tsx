import Link from "next/link";

type Props = {
  id: string;
  domain: string;
  main: string;
};

export default function SiteThumbnail({ id, domain, main }: Props) {
  const env = process.env.NODE_ENV;

  let host = `http://${domain}`;
  if (env === "production") host = `https://${domain}`;

  const pagehref = `${host}.${process.env.NEXT_PUBLIC_domain}`;

  return (
    <div className="card card-compact bg-base-100 border">
      <div className="card-body">
        <div className="card-title">{domain}</div>
        <div>If a dog chews shoes whose shoes does he choose?</div>
        <div className="card-actions justify-end gap-3 mt-8">
          <Link
            href={`/sites/${domain}/setting`}
            className="btn btn-xs btn-primary btn-outline"
          >
            Setting
          </Link>
          <Link
            target="_blank"
            href={pagehref}
            className="btn btn-xs btn-primary"
          >
            Open Site
          </Link>
        </div>
      </div>
    </div>
  );
}
