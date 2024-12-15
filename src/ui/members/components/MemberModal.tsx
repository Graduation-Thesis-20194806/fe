import BoxContainer from "@/common/components/container/BoxContainer";
import { Alert, Modal, Typography } from "antd";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ProjectsService, RoleEntity } from "../../../../client-sdk";
import AppInput from "@/common/components/AppInput";
import AppSelect from "@/common/components/AppSelect";
import AppButton from "@/common/components/AppButton";
import { CopyOutlined } from "@ant-design/icons";

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
  const [alert, setAlert] = useState<any>();
  const onSubmit = useCallback(
    async (data: InvitationDto) => {
      setAlert(undefined);
      setInvitationLink(undefined);
      const res = (await ProjectsService.projectsControllerGetInvitationLink(
        projectId,
        data.email,
        Number(data.roleId)
      )) as any;
      setAlert({
        type: "success",
        message: "Invite successfully!",
      });
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
        {alert && (
          <Alert type={alert.type} message={alert.message} className="mb-4" />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
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
        {invitationLink && (
          <div className="bg-[#f1f1f1] flex rounded-[6px] px-3 py-2 gap-2 w-full justify-between items-center">
            <Typography.Text className="flex-grow" ellipsis>
              {invitationLink}
            </Typography.Text>{" "}
            <span
              onClick={() => {
                navigator.clipboard.writeText(invitationLink);
                setAlert({
                  type: "info",
                  message: "Copied to your clipboard"
                })
              }}
              className="cursor-pointer"
            >
              <CopyOutlined />
            </span>
          </div>
        )}
      </BoxContainer>
    </Modal>
  );
};

export default MemberModal;
