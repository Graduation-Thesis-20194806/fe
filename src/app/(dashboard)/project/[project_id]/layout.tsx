"use client"
import AppSideBar from "@/common/components/layout/AppSideBar";
import { getStorage, setStorage } from "@/common/helpers/storage";
import { useBoundStore } from "@/store";
import { Layout, Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectsService } from "../../../../../client-sdk";

export default function ProjectDetailLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const [loading, setLoading] = useState(true);
  const { setCurrent } = useBoundStore();
  const {project_id} = useParams()
  const router = useRouter();
  useEffect(() => {
    ProjectsService.projectsControllerGetProject(project_id.toString()).then((res)=>{
      setStorage('project',JSON.stringify({id: res.id, role: res.userRole?.category, name: res.name}),'local')
      setCurrent(res.id, res.userRole?.category, res.name)
      setLoading(false)
    })
  }, []);
  if (loading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  return (
    <Layout className="bg-white">
      <AppSideBar />
      {children}
    </Layout>
  );
}
