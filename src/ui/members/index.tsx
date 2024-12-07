"use client";
import AppButton from "@/common/components/AppButton";
import BoxContainer from "@/common/components/container/BoxContainer";
import PageContainer from "@/common/components/container/PageContainer";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, TableProps, Tag } from "antd";
import { ProjectsService, RoleEntity, UserEntity } from "../../../client-sdk";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import RoleModal from "./components/RoleModal";
import { RoleData } from "@/common/validate/role";
import MemberModal from "./components/MemberModal";

const MembersContainer = () => {
  const { project_id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMemberOpen, setIsModalMemberOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalMember = () => {
    setIsModalMemberOpen(true);
  };

  const onCloseModalMember = () => {
    setIsModalMemberOpen(false);
  };

  const { data: roles, refetch } = useQuery({
    queryKey: ["list-roles", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerGetRoles(
        project_id.toString()
      );
      return res;
    },
  });
  const { data: members, refetch: refetchMember } = useQuery({
    queryKey: ["list-members", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerGetMembers(
        project_id.toString()
      );
      return res.items;
    },
  });
  const handleSubmit = useCallback(
    async (data: RoleData) => {
      await ProjectsService.projectsControllerCreateRole(
        project_id.toString(),
        data
      );
      await refetch();
      setIsModalOpen(false);
    },
    [project_id]
  );

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteRole = useCallback(
    async (id: number) => {
      await ProjectsService.projectsControllerDeleteRole(
        project_id.toString(),
        id.toString()
      );
      await refetch();
    },
    [project_id]
  );

  const roleColumns: TableProps["columns"] = useMemo(
    () => [
      {
        dataIndex: "category",
        key: "category",
        title: "Category",
        render: (value) => (
          <Tag
            color={
              value == RoleEntity.category.OWNER
                ? "red"
                : value == RoleEntity.category.MEMBER
                ? "green"
                : "yellow"
            }
          >
            {value}
          </Tag>
        ),
        filters: [
          {
            text: "Owner",
            value: RoleEntity.category.OWNER,
          },
          {
            text: "Member",
            value: RoleEntity.category.MEMBER,
          },
          {
            text: "Guest",
            value: RoleEntity.category.GUEST,
          },
        ],
        onFilter: (value, record) => record.category == value,
      },
      {
        dataIndex: "name",
        key: "name",
        title: "Name",
      },
      {
        key: "action",
        title: "Action",
        render: (_, { id, category }) => (
          <Space>
            <Button icon={<EditOutlined />} variant="outlined" size="small" />
            <Button
              icon={<DeleteOutlined />}
              variant="outlined"
              size="small"
              onClick={() => handleDeleteRole(id)}
              disabled={category === RoleEntity.category.OWNER}
            />
          </Space>
        ),
      },
    ],
    [handleDeleteRole]
  );

  const handleDeleteMember = useCallback(
    async (user_id: number) => {},
    [project_id]
  );

  const memberColumns: TableProps<UserEntity>["columns"] = useMemo(
    (): TableProps<UserEntity>["columns"] => [
      {
        key: "role",
        render: (_, { role }) => <>{role?.name}</>,
        title: "Role",
      },
      {
        dataIndex: "fullname",
        key: "fullname",
        title: "Full Name",
      },
      {
        dataIndex: "email",
        key: "email",
        title: "Email",
      },
      {
        key: "action",
        title: "Action",
        render: (_, { id, role }) => (
          <Button
            icon={<DeleteOutlined />}
            variant="outlined"
            size="small"
            onClick={() => handleDeleteMember(id)}
            disabled={role?.category === RoleEntity.category.OWNER}
          />
        ),
      },
    ],
    [handleDeleteMember]
  );
  return (
    <PageContainer title="Members and Roles">
      <BoxContainer
        title="Roles"
        sideChildren={
          <AppButton
            size="small"
            icon={<PlusOutlined />}
            text={"Add Role"}
            onClick={showModal}
          />
        }
      >
        <Table className="app-table" columns={roleColumns} dataSource={roles} />
      </BoxContainer>
      <BoxContainer
        title="Members"
        sideChildren={
          <AppButton
            size="small"
            icon={<PlusOutlined />}
            text={"Invite member"}
            onClick={showModalMember}
          />
        }
      >
        <Table
          className="app-table"
          columns={memberColumns}
          dataSource={members}
        />
      </BoxContainer>
      <RoleModal
        isOpen={isModalOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <MemberModal isOpen={isModalMemberOpen} onClose={onCloseModalMember} projectId={project_id.toString()} roles={roles}/>
    </PageContainer>
  );
};

export default MembersContainer;
