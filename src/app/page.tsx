"use client"
import { getStorage } from "@/common/helpers/storage";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const token = getStorage('token', 'local')
    if (!token) {
      router.push(`/login`)
    }else {
      router.push('/project')
    }
  }, [router])

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
