"use client";
import AppLogo from "@/common/components/AppLogo";
import { getStorage, removeStorage } from "@/common/helpers/storage";
import { useBoundStore } from "@/store";
import Notifications from "@/ui/notifications";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Divider,
  Dropdown,
  Layout,
  MenuProps,
  Space,
  Spin,
} from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
const { Header } = Layout;

export default function ProjectLayout({
  children,
}: React.PropsWithChildren<object>) {
  const [loading, setLoading] = useState(true);
  const { username, avatar, setUser } = useBoundStore();
  const router = useRouter();
  const handleLogout = useCallback(() => {
    removeStorage("token");
    removeStorage("project");
    removeStorage("refresh_token");
    removeStorage("user");
    router.push("/login");
  }, [router]);
  const items: MenuProps["items"] = useMemo(
    () => [
      {
        label: "Logout",
        key: "0",
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
    [handleLogout]
  );
  useEffect(() => {
    const token = getStorage("token", "local");
    if (!token) {
      router.push("/login");
      return;
    }
    const user = getStorage("user", "local") ?? "{}";
    const userObj = JSON.parse(user);
    setUser({
      username: userObj.username,
      avatar: userObj.avatar,
      userId: userObj.id,
    });
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
    <Layout className="absolute inset-0 bg-[#F1F1F1]">
      <Header className="flex items-center bg-white border-b-[1px] border-[var(--border-color)] z-50 h-[40px] sticky left-0 right-0 top-0">
        <div className="flex flex-grow items-center">
          <AppLogo showSlogan={false} fontSize={24} />
          <Divider type="vertical" className="h-7 top-0 border-gray-300 mx-4" />
          <div className="flex items-center gap-3">
            <span
              className="cursor-pointer leading-[1]"
              onClick={() => {
                removeStorage("project");
                router.push("/project");
              }}
            >
              My project
            </span>
            <span
              className="cursor-pointer leading-[1]"
              onClick={() => {
                router.push("/profile");
              }}
            >
              My profile
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-fit">
          <Notifications />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <div className="flex items-center gap-2 leading-[1]">
                {avatar ? (
                  <Avatar src={avatar} />
                ) : (
                  <Avatar
                    icon={<UserOutlined />}
                    className="bg-[var(--primary-color)]"
                    size="small"
                  />
                )}
                {username}
              </div>
            </a>
          </Dropdown>
        </div>
      </Header>
      {children}
    </Layout>
  );
}
