import React, { useEffect, useMemo, useState } from "react";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useBoundStore } from "@/store";
import {
  CalendarOutlined,
  ExceptionOutlined,
  FolderOutlined,
  FundOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { RoleEntity } from "../../../../client-sdk";
type MenuKeyProps = {
  selected: string;
  open: Array<string>;
};
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key?: string[],
  link?: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  const newKey = key ? key.join("***") : link ? link : "";
  return {
    key: newKey,
    icon,
    children,
    label: link ? <Link href={link}>{label} </Link> : label,
    type,
  } as MenuItem;
}
const AppMenu = () => {
  const { project_id, user_role } = useBoundStore();
  const [menuKey, setMenuKey] = useState<MenuKeyProps>({
    selected: "",
    open: [],
  });

  const pathname = usePathname();
  const items = useMemo(() => {
    const baseItems = [
      getItem(
        "Dashboard",
        [`/project/${project_id}`],
        `/project/${project_id}`,
        <FundOutlined />
      ),
      getItem(
        "Bug Reports",
        [`/project/${project_id}/reports`],
        `/project/${project_id}/reports`,
        <ExceptionOutlined />
      ),
    ];
    if (user_role === RoleEntity.category.GUEST) return baseItems;
    baseItems.push(
      getItem(
        "Tasks",
        [
          `/project/${project_id}/tasks`,
          `/project/${project_id}/tasks/statistic`,
        ],
        undefined,
        <CalendarOutlined />,
        [
          getItem(
            "List View",
            [`/project/${project_id}/tasks`],
            `/project/${project_id}/tasks`
          ),
          getItem(
            "Statistic",
            [`/project/${project_id}/tasks/statistic`],
            `/project/${project_id}/tasks/statistic`
          ),
        ]
      )
    );
    if (user_role === RoleEntity.category.MEMBER) return baseItems;
    baseItems.push(
      getItem(
        "Member & Roles",
        [`/project/${project_id}/members`],
        `/project/${project_id}/members`,
        <UsergroupAddOutlined />
      ),
      getItem(
        "Files & Folders",
        [`/project/${project_id}/files`],
        `/project/${project_id}/files`,
        <FolderOutlined />
      ),

      getItem(
        "Settings",
        [`/project/${project_id}/settings`],
        `/project/${project_id}/settings`,
        <SettingOutlined />
      )
    );
    if (user_role === RoleEntity.category.OWNER) return baseItems;
    return [];
  }, [project_id, user_role]);
  useEffect(() => {
    const ret = {
      selected: "",
      open: [] as Array<string>,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findKey = (items: Array<any>): boolean => {
      for (const item of items) {
        if (item.children) {
          const check = findKey(item.children);
          if (check == true) {
            ret.open.push(String(item.key));
            return true;
          }
        }
        if (
          String(item.key)
            .split("***")
            .find((item) => pathname.endsWith(item))
        ) {
          ret.selected = item.key;
          ret.open.push(String(item.key));
          return true;
        }
      }
      return false;
    };
    if (pathname) {
      findKey(items);
      setMenuKey(ret);
    }
  }, [pathname, items]);
  return (
    <>
      <Menu
        triggerSubMenuAction="click"
        mode="inline"
        selectedKeys={[menuKey.selected]}
        openKeys={menuKey.open}
        items={items}
        style={{ background: "transparent", border: "none" }}
        onOpenChange={(keys) => setMenuKey({ ...menuKey, open: keys })}
      />
    </>
  );
};

export default AppMenu;
