import Loading from "../loading";

const btnModel = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  info: "btn-info",
  error: "btn-error",
};

const btnSize = {
  xs: "btn-xs",
  sm: "btn-sm",
  normal: "",
  lg: "btn-lg",
  xl: "btn-xl",
};

type Props = {
  children: string | JSX.Element | JSX.Element[];
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  model?: "primary" | "secondary" | "info" | "error";
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({
  children,
  type = "button",
  onClick,
  model = "primary",
  size = "normal",
  className,
  disabled,
  loading,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${btnModel[model]} ${btnSize[size]} ${className} flex gap-2`}
      disabled={loading || disabled}
    >
      {loading && <Loading model={model} />}
      {children}
    </button>
  );
}
