import Link from "next/link";
import { useRouter } from "next/router";

export function getInitialProps(context: any) {
  console.log("GET INITIAL PROPS: ", context);

  return {
    props: {},
  };
}

export default function HeaderNotionSite({ dataSite }: { dataSite: any }) {
  const { query } = useRouter();

  if (!dataSite) return <></>;

  // console.log("HEADER: ", dataSite);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  let headerLoop: any = dataSite && dataSite.sitemap;

  const domain = `${dataSite?.domain || ""}`;

  return (
    <header className="navbar bg-primary text-primary-content max-w-3xl mx-auto overflow-hidden">
      <div className="flex-1">
        <Link href="/" className="btn btn-accent">
          {domain}
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {headerLoop?.slice(1).map((s: any) => (
            <li key={s.id}>
              <Link
                href={`${origin}/${s.path}`}
                className={query.path === s.path ? "bg-primary-focus" : ""}
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
