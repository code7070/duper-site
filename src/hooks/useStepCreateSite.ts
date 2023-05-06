import {
  getCreateSite,
  setCreateStep1,
  setCreateStep2,
  setCreateStep3,
  setStepCreate,
} from "@/store/create-site";
import { useDispatch, useSelector } from "react-redux";

export default function useStepCreateSite() {
  const dispatch = useDispatch();
  const stepActive = useSelector(getCreateSite.step);
  const dataStep1 = useSelector(getCreateSite.data1);
  const dataStep2 = useSelector(getCreateSite.data2);
  const dataStep3 = useSelector(getCreateSite.data3);
  const setStepActive = (num: number) => dispatch(setStepCreate(num));
  const setDataStep1 = (payload: any) => dispatch(setCreateStep1(payload));
  const setDataStep2 = (payload: any) => dispatch(setCreateStep2(payload));
  const setDataStep3 = (payload: any) => dispatch(setCreateStep3(payload));
  const resetDataStep = () => {
    setStepActive(1);
    setDataStep1(false);
    setDataStep2(false);
    setDataStep3(false);
  };

  return {
    stepActive,
    dataStep1,
    dataStep2,
    dataStep3,
    setStepActive,
    setDataStep1,
    setDataStep2,
    setDataStep3,
    resetDataStep,
  };
}
