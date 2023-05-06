import CreateStepLayout from "./create-step-layout";
import useStepCreateSite from "@/hooks/useStepCreateSite";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Pagebar = ({
  path,
  children,
  indent,
}: {
  children?: Array<object>;
  path: string;
  indent: 1 | null;
}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  useEffect(() => {
    if (children && children.length > 0) setOpen(true);
  }, [children]);

  return (
    <div className={`${indent === 1 ? "ml-6" : ""}`}>
      <button
        onClick={toggle}
        className={`flex w-full text-left rounded-md border border-slate-200 p-4 items-center gap-4 text-slate-500 mb-5`}
      >
        <div
          className={`w-2 transition-all duration-200 ${
            open ? "rotate-90" : ""
          }`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="w-full">{`/${path}`}</div>
      </button>
      <div
        className={`list transition-all duration-200 border border-transparent ${
          open ? "max-h-[100vh] border-slate-200" : "max-h-0 overflow-hidden"
        }`}
      >
        {children &&
          children.map((x: any) => <Pagebar key={x.id} indent={1} {...x} />)}
      </div>
    </div>
  );
};

export default function CreateSiteStep2() {
  const [routeList, setRouteList] = useState<any>(false);

  const { stepActive, dataStep1 } = useStepCreateSite();

  useEffect(() => {
    const calls = async () => {
      console.log("RES: ", dataStep1);
      setRouteList(dataStep1);
    };

    if (stepActive === 2 && !routeList) calls();
  }, [stepActive, routeList, dataStep1]);

  return (
    <CreateStepLayout isOpen={stepActive === 2} title="Atur Route Web Kamu">
      <div className="mb-4 -mt-4">
        Website kamu akan memiliki routing atau navigasi halaman seperti dibawah
        ini:
      </div>
      {routeList &&
        routeList.data[0].sitemap.map((i: any) => {
          return <Pagebar key={i.id} {...i} />;
        })}
    </CreateStepLayout>
  );
}
