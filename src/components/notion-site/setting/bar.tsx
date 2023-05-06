export default function SettingBar({
  title,
  subtitle = "Lorem ipsum dolor sit amet amet pok pok",
  children,
}: {
  title: string;
  subtitle?: string;
  children?: JSX.Element | JSX.Element[] | string;
}) {
  return (
    <div className="flex justify-between mb-6">
      <div className="w-1/2">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-slate-400 text-sm">{subtitle}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
