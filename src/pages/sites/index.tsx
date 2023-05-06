import { dologout, getCookie } from "@/utils/helpers";
import { useEffect, useState } from "react";
import useGetSiteList from "@/hooks/useGetSiteList";
import SiteList from "@/sections/site-list/list";
import SiteListHeader from "@/sections/site-list/header";

export default function SitesPage() {
  const [user, setUser] = useState("");
  const username = getCookie("username");

  const hookSiteList = useGetSiteList();
  const { data } = hookSiteList;

  useEffect(() => {
    setUser(username || "");
  }, [username]);

  const noSites = data && data.error;

  return (
    <div className="wrapper !max-w-2xl !mx-auto">
      <div className="flex justify-between">
        <h2 className="text-2xl">{user}</h2>
        <button
          type="button"
          className="btn btn-error btn-outline"
          onClick={dologout}
        >
          Logout
        </button>
      </div>
      <div className="my-20 rounded-xl">
        <SiteListHeader data={data} />
        {noSites && (
          <div className="flex mx-4 mt-4 p-4 bg-red-50">
            {data.error.message}
          </div>
        )}
        <SiteList list={hookSiteList} />
      </div>
    </div>
  );
}
