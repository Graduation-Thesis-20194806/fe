import { Spin } from "antd";

export default function CallbackLayout({
  children,
}: React.PropsWithChildren<object>) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spin size="large" />
      {children}
    </div>
  );
}
