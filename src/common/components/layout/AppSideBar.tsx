"use client";
import { Layout } from "antd";
import AppMenu from "./ProjectMenu";
import { useMemo, useState } from "react";
import { useBoundStore } from "@/store";
import clsx from "clsx";
const { Sider } = Layout;
const AppSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { project_name } = useBoundStore();
  const project_text = useMemo(() => {
    if (collapsed) return project_name?.substring(0, 1);
    return project_name;
  }, [project_name, collapsed]);
  return (
    <Sider
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="bg-[#f1f1f1] app-sidebar"
    >
      <div
        className={clsx(
          "pt-4 pb-2 text-[--primary-color] font-bold text-center",
          { "text-[18px]": !collapsed, "text-[24px]": collapsed }
        )}
      >
        {project_text}
      </div>
      <AppMenu />
    </Sider>
  );
};
export default AppSideBar;
