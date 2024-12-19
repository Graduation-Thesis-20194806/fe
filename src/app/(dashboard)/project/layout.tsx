"use client";
import { removeStorage } from "@/common/helpers/storage";
import {
  Spin,
} from "antd";
import { useEffect, useState } from "react";

export default function ProjectLayout({
  children,
}: React.PropsWithChildren) {
  const [loading, setLoading] = useState(true);
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
