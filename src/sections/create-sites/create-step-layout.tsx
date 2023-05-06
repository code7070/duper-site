import { ReactNode } from "react";

export default function CreateStepLayout({
  isOpen,
  title,
  children,
}: {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`max-w-lg mx-auto transition-all duration-300 ${
        isOpen ? "max-h-[300vh]" : "max-h-0 overflow-hidden"
      }`}
    >
      <div className="mb-8 text-2xl">{title}</div>
      <div>{children}</div>
    </div>
  );
}
