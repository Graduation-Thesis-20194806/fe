"use client";
import PageContainer from "@/common/components/container/PageContainer";
import PhasePage from "./PhaseSettings";
import AssignsPage from "./AssignSettings";
import ProjectForm from "../project-list/form";
import { useParams } from "next/navigation";
import { Segmented } from "antd";
import { useState } from "react";
import ProjectDomain from "./ProjectDomain";
enum SettingsEnum {
  DOMAIN = "DOMAIN",
  PHASE = "PHASE",
  ASSIGN = "ASSIGN",
  SYNC = "SYNC",
}
const SETTINGS_OPTIONS_LIST = [
  {
    label: "Domains",
    value: SettingsEnum.DOMAIN,
  },
  {
    label: "Phases",
    value: SettingsEnum.PHASE,
  },
  {
    label: "Assignee",
    value: SettingsEnum.ASSIGN,
  },
  {
    label: "Sync",
    value: SettingsEnum.SYNC,
  },
];
const SettingsContainer = () => {
  const { project_id } = useParams();
  const [viewMode, setViewMode] = useState(SettingsEnum.DOMAIN);
  return (
    <PageContainer title="Project Settings" className="mb-8">
      <ProjectForm projectId={project_id.toString()} />
      <div>
        <Segmented
          options={SETTINGS_OPTIONS_LIST}
          value={viewMode}
          onChange={(value) => setViewMode(value)}
          className="mb-8"
        />
        {viewMode === SettingsEnum.DOMAIN && <ProjectDomain />}
        {viewMode === SettingsEnum.PHASE && <PhasePage />}
        {viewMode === SettingsEnum.ASSIGN && <AssignsPage />}
      </div>
    </PageContainer>
  );
};

export default SettingsContainer;
