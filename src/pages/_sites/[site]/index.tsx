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
  const { data } = await supabase()
    .from("sites")
    .select("domain")
    .limit(100)
    .order("created_at", { ascending: false })
    .eq("is_active", true);
  let paths = [{ params: { site: "abc" } }];
  if (data && data?.length > 0)
    paths = data.map((d: any) => ({ params: { site: d.domain } }));
  return { paths, fallback: true };
}

export async function getStaticProps(context: any) {
  const { site } = context.params;

  let notionPage = null;

  const respage = await supabase().from("sites").select().eq("domain", site);

  if (respage && respage.data && respage.data.length > 0) {
    const id = `${respage && respage.data && respage.data[0].page_id}`;
    const pageId = parsePageId(id);
    const api = new NotionAPI();
    notionPage = await api.getPage(pageId);
  }

  return {
    props: {
      page: respage,
      notionPage,
    },
  };
}

export default function Sites({
  page = { data: null },
  notionPage: notion,
}: any) {
  const { isFallback, events } = useRouter();

  useEffect(() => {
    events.on("routeChangeStart", () => nProgress.start());
    events.on("routeChangeComplete", () => nProgress.done());
  }, [events]);

  if (isFallback) return <PageLoading />;

  const dataSite = page.data[0];
  const domain = (dataSite && dataSite.domain) || "";

  return (
    <>
      <PageHead title={domain} />
      <DuperRenderer notionMap={notion} dataSite={dataSite} />
    </>
  );
}
