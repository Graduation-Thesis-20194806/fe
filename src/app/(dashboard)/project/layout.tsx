"use client";
import AppLogo from "@/common/components/AppLogo";
import { getStorage, removeStorage } from "@/common/helpers/storage";
import { useBoundStore } from "@/store";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Divider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  Spin,
} from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
const { Header } = Layout;

export default function ProjectLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const [loading, setLoading] = useState(true);
  const { username, avatar, setUser, setCurrent } = useBoundStore();
  const router = useRouter();
  useEffect(() => {
    removeStorage('project','local')
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  if (loading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  return (
    <>{children}</>
  );
}
