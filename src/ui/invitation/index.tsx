"use client";
import AppButton from "@/common/components/AppButton";
import AppLogo from "@/common/components/AppLogo";
import BoxContainer from "@/common/components/container/BoxContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ProjectsService } from "../../../client-sdk";
import { message } from "antd";

const InvitationContainer = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const token = searchParams.get("token");
  const router = useRouter();

  const onConfirm = useCallback(async () => {
    try {
      const res = await ProjectsService.projectsControllerVerifyMember(
        projectId ?? "",
        token ?? ""
      );
      if (res.success) {
        router.push(`/project/${projectId}`);
        message.success('Join project successfully')
        return
      }
    } catch (e) {
      message.error("There are something wrong");
    }
  }, [projectId, token]);

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat flex justify-end items-center z-10"
      style={{ backgroundImage: "url('images/background.png')" }}
    >
      <div className="md:backdrop-blur-[18px] h-full w-full md:w-1/2 flex justify-center items-center px-7">
        <div className="w-full md:w-[388px] rounded-lg p-5 bg-white shadow">
          <AppLogo fontSize={40} className="mb-4" />
          <BoxContainer title="Join the Project!">
            <AppButton text="Confirm" className="w-[200px]" onClick={onConfirm} />
          </BoxContainer>
        </div>
      </div>
    </div>
  );
};

export default InvitationContainer;
