type Props = {
  size?: "small" | "medium" | "large";
  model?: "primary" | "secondary" | "info" | "error";
};

const borderModel = {
  primary: "border-primary",
  secondary: "border-secondary",
  info: "border-info",
  error: "border-error",
};

export default function Loading({ size = "small", model = "primary" }: Props) {
  const mapSize = {
    small: `w-4 h-4 border-2`,
    medium: `w-8 h-8 border-4`,
    large: `w-20 h-20 border-8`,
  };

  return (
    <div
      className={`${mapSize[size]} border rounded-full ${borderModel[model]} border-b-transparent animate-spin`}
    />
  );
}
