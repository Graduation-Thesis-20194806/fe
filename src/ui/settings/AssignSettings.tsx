"use client";
import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Select, Tag, Avatar } from "antd";
import {
  AssignIssueTypeDto,
  ProjectsService,
  ReportListItemEntity,
  UpdateAssignDto,
} from "../../../client-sdk";
import { useParams } from "next/navigation";
import BoxContainer from "@/common/components/container/BoxContainer";
import { UserOutlined } from "@ant-design/icons";
import { getS3Link } from "@/common/helpers/link";

const issueTypeOptions = [
  { label: "Ui", value: "UI" },
  { label: "Functional", value: "FUNCTIONAL" },
  { label: "Performance", value: "PERFORMANCE" },
  { label: "Security", value: "SECURITY" },
  { label: "Network", value: "NETWORK" },
  { label: "Data", value: "DATA" },
  { label: "Other", value: "OTHER" },
];

export default function AssignsPage() {
  const { project_id } = useParams();

  const {
    data: assigns,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigns", project_id],
    queryFn: async () => {
      if (!project_id) return [];
      const res = await ProjectsService.projectsControllerGetAssigns(
        Number(project_id)
      );
      return res;
    },
  });

  const { data: members } = useQuery({
    queryKey: ["list-members", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerGetMembers(
        project_id.toString()
      );
      return res.items;
    },
  });

  const assignSrc = useMemo(() => {
    if (!assigns) return [];
    const map = new Map();
    for (const type of issueTypeOptions) {
      map.set(type.value, undefined);
    }
    for (const assign of assigns) {
      if (!map.get(assign.issueType)) {
        map.set(assign.issueType, assign);
      }
    }
    const result = [];
    for (const [key, value] of map) {
      if (value)
        result.push({
          id: value.id,
          userId: value.Assignee.user.id,
          issueType: key,
          role: value.Assignee.role.name,
          avatar: value.Assignee.user.avatar,
        });
      else result.push({ issueType: key });
    }
    return result;
  }, [assigns]);

  const onCreate = useCallback(
    async (values: AssignIssueTypeDto) => {
      await ProjectsService.projectsControllerAssignIssueType(
        Number(project_id),
        values
      );
      await refetch();
    },
    [project_id, refetch]
  );

  const onUpdate = useCallback(
    async (id: number, values: UpdateAssignDto) => {
      await ProjectsService.projectsControllerUpdateAssign(
        Number(project_id),
        id,
        values
      );
      await refetch();
    },

    [project_id, refetch]
  );

  const onDetelete = useCallback(
    async (id: number) => {
      await ProjectsService.projectsControllerRemoveAssign(
        Number(project_id),
        id
      );
      await refetch();
    },
    [project_id, refetch]
  );

  const columns = [
    {
      title: "Issue Type",
      dataIndex: "issueType",
      key: "issueType",
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _: any,
        {
          issueType,
          id,
          userId,
        }: {
          issueType: ReportListItemEntity.issueType;
          id?: number;
          userId?: number;
        }
      ) => {
        return (
          <Select
            options={members?.map((item) => ({
              label: item.username,
              value: item.id,
            }))}
            className="w-[160px]"
            value={userId}
            onChange={async (newValue: number) => {
              if (id && !newValue) {
                await onDetelete(id);
              } else if (id && newValue) {
                await onUpdate(id, {
                  userId: newValue,
                  issueType,
                });
              } else if (!id && newValue) {
                await onCreate({
                  userId: newValue,
                  issueType,
                });
              }
            }}
            allowClear
          />
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (value?: string) => <Tag>{value}</Tag>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (value?: string) =>
        value ? (
          <Avatar src={getS3Link(value)} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        ),
    },
  ];

  return (
    <BoxContainer title="Auto Assign" className="mb-6">
      <Table
        columns={columns}
        dataSource={assignSrc}
        loading={isLoading}
        rowKey="id"
        className="app-table"
        pagination={false}
      />
    </BoxContainer>
  );
}
