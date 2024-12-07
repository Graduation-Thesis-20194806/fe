import clsx from "clsx";

type Props = {
  fontSize?: number;
  showSlogan?: boolean;
  className?: string;
};

export default function AppLogo({ fontSize = 50, showSlogan = true, className }: Props) {
  return (
    <div className={clsx("app-logo", className)}>
      <h3 style={{ fontSize }}>BugHust</h3>
      {showSlogan && <p style={{ fontSize: (fontSize * 14) / 50 }}>Better Life for Testers</p>}
    </div>
  );
}
