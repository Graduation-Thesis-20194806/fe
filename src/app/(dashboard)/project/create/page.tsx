"use client";

import PageContainer from "@/common/components/container/PageContainer";
import ProjectForm from "@/ui/project-list/form";

export default function ProjectPage() {
  return (
    <PageContainer title="Create Project">
      <ProjectForm />
    </PageContainer>
  );
}
