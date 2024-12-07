import AppSelect from "@/common/components/AppSelect";
import { CreateRoleSchema, RoleData } from "@/common/validate/role";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Space } from "antd";
import { Controller, useForm } from "react-hook-form";
import { RoleEntity } from "../../../../client-sdk";
import AppInput from "@/common/components/AppInput";
import TitleWrapper from "@/common/components/TitleWrapper";
import AppButton from "@/common/components/AppButton";

type Props = {
  isOpen: boolean;
  onSubmit: (data: RoleData) => Promise<void>;
  onCancel: () => void;
};
const RoleModal = ({ isOpen, onSubmit, onCancel }: Props) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleData>({
    resolver: yupResolver(CreateRoleSchema),
  });
  const submitHandler = async (data: RoleData) => {
    await onSubmit(data);
    reset({
      name: undefined,
      category: undefined,
    });
  };
  const cancelHandler = () => {
    onCancel();
    reset({
      name: undefined,
      category: undefined,
    });
  };
  return (
    <Modal title="Create Role" open={isOpen} footer={false} closable={false}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <TitleWrapper
          label="Category"
          error={errors.category?.message}
          className="mb-4"
        >
          <Controller
            control={control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <AppSelect
                value={value}
                onChange={onChange}
                options={[
                  {
                    label: "Owner",
                    value: RoleEntity.category.OWNER,
                  },
                  {
                    label: "Member",
                    value: RoleEntity.category.MEMBER,
                  },
                  {
                    label: "Guest",
                    value: RoleEntity.category.GUEST,
                  },
                ]}
                placeholder="Select Role"
                error={errors.category?.message}
              />
            )}
          />
        </TitleWrapper>
        <TitleWrapper
          label="Role's name"
          error={errors.name?.message}
          className="mb-4"
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <AppInput
                value={value}
                onChange={onChange}
                placeholder="Enter project name"
                error={errors.name?.message}
              />
            )}
          />
        </TitleWrapper>
        <Space>
          <AppButton text="Submit" htmlType="submit" />
          <AppButton variant="outlined" text="Cancel" onClick={cancelHandler} type="default"/>
        </Space>
      </form>
    </Modal>
  );
};

export default RoleModal;
