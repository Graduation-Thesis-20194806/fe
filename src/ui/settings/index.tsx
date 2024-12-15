import PageContainer from "@/common/components/container/PageContainer";
import PhasePage from "./PhaseSettings";
import AssignsPage from "./AssignSettings";

const SettingsContainer = () => {
  return (
    <PageContainer title="Project Settings">
      <PhasePage />
      <AssignsPage/>
    </PageContainer>
  );
};

export default SettingsContainer;
