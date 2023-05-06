import Button from "@/components/button";
import SettingBar from "@/components/notion-site/setting/bar";
import PageLoading from "@/components/page-loading";
import supabase from "@/utils/supabase";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

export async function getStaticPaths() {
  return {
    paths: [{ params: { domain: "abc" } }],
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  return {
    props: { domain: context.params.domain },
  };
}

export default function SiteSetting(props: any) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>(false);
  const [forms, setForms] = useState<any>({ loading: false });
  const { mutate } = useSWRConfig();

  const { isFallback, back, replace } = useRouter();

  useEffect(() => {
    const doFetch = async () => {
      const apiUrl = `/api/get-site?domain=${props.domain}`;
      const data = await (await fetch(apiUrl)).json();
      setLoading(false);
      setData(data.sites[0]);
    };
    if (props.domain) doFetch();
  }, [props.domain]);

  useEffect(() => {
    if (data && data.id && Object.keys(forms).length < 2)
      setForms({ ...forms, ...data });
  }, [data, forms]);

  const submitGeneral = async (e: any) => {
    e.preventDefault();
    setForms({ ...forms, loading: true });
    const body = { ...forms, theme: forms.theme.id };
    delete body.loading;
    const { status, data } = await supabase()
      .from("sites")
      .update(body)
      .eq("id", forms.id)
      .select();
    if (status >= 200 && status < 399) {
      await mutate("/api/get-site-list");
      alert("Update Web Berhasil");
      replace("/sites");
    }
    setForms({ ...forms, loading: false });
  };

  if (isFallback || isLoading) return <PageLoading />;
  else if (data && data.error)
    return (
      <div className="fixed left-0 top-0 w-full h-full bg-red-100 flex items-center justify-center">
        <div className="text-red-500 font-semibold   uppercase">
          {data.error.message}
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 p-4 rounded-md bg-base-300">
        <div>
          <button type="button" className="btn btn-accent" onClick={back}>
            back
          </button>
        </div>
        <div>
          <div className="text-xs text-secondary-content leading-4 opacity-50">
            SITE SETTINGS
          </div>
          <div className="text-3xl text-primary-content leading-6 font-semibold opacity-70">
            {props.domain}
          </div>
        </div>
      </div>
      <form onSubmit={submitGeneral} className="mt-10 px-4">
        <SettingBar title="Aktif">
          <input
            type="checkbox"
            className={`toggle ${forms?.is_active ? "toggle-primary" : ""}`}
            checked={forms?.is_active || false}
            onChange={() => setForms({ ...forms, is_active: !forms.is_active })}
          />
        </SettingBar>
        <SettingBar title="Subdomain">
          <input
            className="input input-bordered w-48"
            value={forms?.domain || ""}
            onChange={(e) =>
              setForms({ ...forms, domain: e.target.value || "" })
            }
          />
        </SettingBar>
        <SettingBar title="Tema">
          <button
            type="button"
            className="btn btn-outline flex items-center gap-3"
          >
            <div>{forms?.theme?.name}</div>
            <div className="w-2">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </button>
        </SettingBar>
        <div className="flex justify-end mt-20">
          <Button type="submit" loading={forms.loading}>
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
