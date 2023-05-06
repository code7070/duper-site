import useStepCreateSite from "@/hooks/useStepCreateSite";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

const steps = [1, 2, 3, 4];

interface ButtonStepProps {
  click?: React.MouseEventHandler<HTMLButtonElement>;
  stepActive: number;
  num: number;
  children: number | ReactNode;
  disabled?: boolean;
}

const ButtonStep = ({
  click,
  num,
  stepActive,
  children,
  disabled,
}: ButtonStepProps) => {
  return (
    <button
      onClick={click}
      disabled={disabled}
      className={`text-lg font-bold border border-primary w-10 h-10 rounded-full flex items-center justify-center duration-200 hover:bg-purple-100 [&>svg]:w-6 [&>svg]:h-6 ${
        stepActive === num
          ? "bg-primary text-primary-content hover:bg-primary"
          : "bg-white text-primary disabled:text-slate-400 disabled:border-slate-400"
      }`}
    >
      {children}
    </button>
  );
};

export default function ProgressCreate() {
  const { stepActive, setStepActive, dataStep1, resetDataStep } =
    useStepCreateSite();

  const noProgress = !dataStep1;

  return (
    <div className="flex items-center justify-between gap-2 max-w-lg mx-auto mb-10">
      <ButtonStep
        num={0}
        stepActive={stepActive}
        click={resetDataStep}
        disabled={noProgress}
      >
        <FontAwesomeIcon icon={faRotateRight} />
      </ButtonStep>
      {steps.map((item) => (
        <ButtonStep
          key={item}
          click={() => setStepActive(item)}
          num={item}
          stepActive={stepActive}
        >
          {item}
        </ButtonStep>
      ))}
    </div>
  );
}
