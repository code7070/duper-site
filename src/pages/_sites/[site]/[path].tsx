import PageLoading from "@/components/page-loading";
import DuperRenderer from "@/notion/duper-renderer";
import PageHead from "@/pages/PageHead";
import supabase from "@/utils/supabase";
import { useRouter } from "next/router";
import { NotionAPI } from "notion-client";
import { parsePageId } from "notion-utils";
import nProgress from "nprogress";
import { useEffect } from "react";

export async function getStaticPaths() {
  return {
    paths: [{ params: { site: "yahu", path: "yuhu" } }],
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const { site, path } = context.params;

  const { data } = await supabase().from("sites").select().eq("domain", site);

  let dataPage = null;
  let notionPage = null;
  let notionTarget: any = null;

  if (data && data.length > 0) {
    dataPage = data[0];
    const page = data[0];
    const sitemap: Array<object> = page?.sitemap || [];
    notionTarget = sitemap.find((s: any) => s.path === path);
    const pageId = parsePageId(`${notionTarget.id}`);
    const api = new NotionAPI();
    notionPage = await api.getPage(pageId);
  }

  return {
    props: { notionPage, notionTarget, page: dataPage },
  };
}

export default function SitesPage({
  notionPage,
  notionTarget,
  page = { domain: "" },
}: {
  notionPage: any;
  notionTarget: any;
  page: any;
}) {
  const { isFallback, events } = useRouter();

  useEffect(() => {
    events.on("routeChangeStart", () => nProgress.start());
    events.on("routeChangeComplete", () => nProgress.done());
  }, [events]);

  const domain = (page && page.domain) || "";

  let title = "";
  if (notionTarget && page) title = `${domain} - ${notionTarget.path}`;
  else if (page) title = domain;

  if (isFallback) return <PageLoading />;

  return (
    <>
      <PageHead title={title} />
      <DuperRenderer notionMap={notionPage} dataSite={page} />
    </>
  );
}
