import BoxContainer from "@/common/components/container/BoxContainer";
import { Modal } from "antd";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ProjectsService, RoleEntity } from "../../../../client-sdk";
import AppInput from "@/common/components/AppInput";
import AppSelect from "@/common/components/AppSelect";
import AppButton from "@/common/components/AppButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  roles?: RoleEntity[];
};

type InvitationDto = {
  email: string;
  roleId: string;
};

const MemberModal = ({ isOpen, onClose, projectId, roles }: Props) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InvitationDto>();
  const [invitationLink, setInvitationLink] = useState<string>();
  const onSubmit = useCallback(
    async (data: InvitationDto) => {
      const res = await ProjectsService.projectsControllerGetInvitationLink(
        projectId,
        data.email,
        Number(data.roleId)
      );
      if (res?.invitationLink) setInvitationLink(res.invitationLink);
    },
    [projectId]
  );
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={false}
      title="Share Project"
      className="!w-[720px]"
    >
      <BoxContainer level={2} title="Add or invite people">
        <p className="mb-4">Invite new Members & Guests to this Project.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Controller
              control={control}
              name="email"
              rules={{
                required: "This is required field",
              }}
              render={({ field: { value, onChange } }) => (
                <AppInput
                  placeholder={"abc@example.com"}
                  error={errors.email?.message}
                  value={value}
                  onChange={onChange}
                  className="flex-grow"
                />
              )}
            />
            <Controller
              control={control}
              name="roleId"
              rules={{
                required: "This is required field",
              }}
              render={({ field: { value, onChange } }) => (
                <AppSelect
                  value={value}
                  onChange={onChange}
                  options={
                    roles?.map((item) => ({
                      label: item.name,
                      value: item.id.toString(),
                    })) ?? []
                  }
                  error={errors.roleId?.message}
                  className="w-[200px]"
                />
              )}
            />
            <AppButton htmlType="submit" text="Invite" />
          </div>
        </form>
      </BoxContainer>
    </Modal>
  );
};

export default MemberModal;
