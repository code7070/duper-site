import ProgressCreate from "@/sections/create-sites/progress";
import CreateSiteStep1 from "@/sections/create-sites/step1";
import CreateSiteStep2 from "@/sections/create-sites/step2";

export default function NewSite() {
  return (
    <div className="wrapper">
      <ProgressCreate />
      <CreateSiteStep1 />
      <CreateSiteStep2 />
    </div>
  );
}
