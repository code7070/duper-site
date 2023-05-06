import Button from "@/components/button";
import { fetchAPI } from "@/utils/helpers";
import { useState } from "react";
import CreateStepLayout from "./create-step-layout";
import useStepCreateSite from "@/hooks/useStepCreateSite";
import { useRouter } from "next/router";

export default function CreateSiteStep1() {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("");
  const [notionId, setNotionId] = useState("401f5338dec4448f9806022532f49787");

  const { back } = useRouter();

  const { stepActive, setStepActive, setDataStep1 } = useStepCreateSite();

  const doCreate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (stepActive === 1) {
      const body = { notionId, domain };
      const res = await fetchAPI.get("create-new-site", body);
      if (res?.error) alert(res.error.message);
      else {
        console.log("STEP 1: ", res);
        setDataStep1(res);
        setStepActive(2);
      }
    }
    setLoading(false);
  };

  return (
    <CreateStepLayout title="Create New Site" isOpen={stepActive === 1}>
      <form onSubmit={doCreate}>
        <div className="mb-4">
          <input
            className="input input-bordered input-primary w-full"
            value={notionId}
            placeholder="Notion Link"
            onChange={(e) => setNotionId(e.target.value || "")}
          />
        </div>
        <div className="input-group mb-4">
          <input
            className="input input-bordered input-primary w-full"
            value={domain}
            placeholder="sub-domain"
            onChange={(e) => setDomain(e.target.value || "")}
          />
          <span className="w-3/5">.{process.env.NEXT_PUBLIC_domain}</span>
        </div>
        <div className="mt-8 flex gap-2 justify-between">
          <Button onClick={back}>Cancel</Button>
          <Button
            type="submit"
            disabled={!domain || !notionId}
            loading={loading}
          >
            Create
          </Button>
        </div>
      </form>
    </CreateStepLayout>
  );
}
