import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

export default function SiteListHeader({ data }: { data: any }) {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const doMutate = () => mutate("/api/get-site-list");
  const toNew = async () => router.push(`${router.pathname}/new`);

  const sites = data?.sites;
  const noSites = data && data.error;

  return (
    <div className="flex justify-between items-center">
      <div>
        {sites && (
          <div className="text-xl flex items-center gap-2">
            <span className="badge badge-primary">{sites.length}</span>{" "}
            <span>Site List</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={toNew}
          disabled={!data || noSites}
        >
          Add New
        </button>
        {sites && (
          <div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={doMutate}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
