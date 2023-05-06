import Loading from "@/components/loading";
import SiteThumbnail from "@/components/site/thumbnail";

export default function SiteList({
  list,
}: {
  list: { data: any; isLoading: boolean; isValidating: boolean };
}) {
  const { data, isLoading, isValidating } = list;
  const sitex = data?.sites;

  return (
    <div>
      {(isLoading || isValidating) && (
        <div className="flex justify-center items-center my-8">
          <Loading size="small" />
        </div>
      )}

      <div className="mt-6 w-full grid grid-cols-2 gap-4">
        {sitex &&
          sitex.map((item: any) => <SiteThumbnail key={item.id} {...item} />)}
      </div>
    </div>
  );
}
