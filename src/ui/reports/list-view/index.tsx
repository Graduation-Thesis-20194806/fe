"use client";
import Tasks from "@/common/components/KanBan/Tasks";
import {
  ProjectsService,
  ReportListItemEntity,
  ReportsService,
  UserRoleEntity,
} from "../../../../client-sdk";
import { useParams, useRouter } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Segmented,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import PageContainer from "@/common/components/container/PageContainer";
import AppButton from "@/common/components/AppButton";
import {
  DeleteOutlined,
  LeftOutlined,
  PlusOutlined,
  UndoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatDate } from "@/common/helpers/date";
import { getS3Link } from "@/common/helpers/link";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";
import { useBoundStore } from "@/store";
import AppSelect from "@/common/components/AppSelect";
import { issueTypeList, severityList, statusList } from "../constant";
import { getPriorityIconByID } from "@/common/components/KanBan/TasksItem";
import {
  REPORT_ISSUE_COLOR_MAP,
  REPORT_STATUS_COLOR_MAP,
  REPORT_TYPE_COLOR_MAP,
} from "@/common/constants";
import Link from "next/link";
export const columns = [
  { id: ReportListItemEntity.status.INIT, name: "Backlog", order: 1 },
  { id: ReportListItemEntity.status.CONFIRMING, name: "Confirming", order: 2 },
  {
    id: ReportListItemEntity.status.IN_PROCESSING,
    name: "In progress",
    order: 3,
  },
  { id: ReportListItemEntity.status.DONE, name: "Done", order: 4 },
  { id: ReportListItemEntity.status.REJECTED, name: "Reject", order: 5 },
  { id: ReportListItemEntity.status.CONFIRMED, name: "Confirmed", order: 6 },
  { id: ReportListItemEntity.status.REOPEN, name: "Reopen", order: 7 },
];
enum ViewMode {
  TABLE = "TABLE",
  KANBAN = "KANBAN",
}
const ListView = () => {
  const { user_role, userId } = useBoundStore();
  const { project_id } = useParams();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.TABLE);
  const [role, setrole] = useQueryState("role", { defaultValue: "owner" });
  const [page, setpage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [phaseId, setphaseId] = useQueryState("phaseId", parseAsInteger);
  const [severity, setseverity] = useQueryState(
    "severity",
    parseAsStringEnum<ReportListItemEntity.severity>(
      Object.values(ReportListItemEntity.severity)
    )
  );
  const [issueType, setissueType] = useQueryState(
    "issueType",
    parseAsStringEnum<ReportListItemEntity.issueType>(
      Object.values(ReportListItemEntity.issueType)
    )
  );
  const [status, setstatus] = useQueryState(
    "status",
    parseAsStringEnum<ReportListItemEntity.status>(
      Object.values(ReportListItemEntity.status)
    )
  );
  const [keyword, setkeyword] = useQueryState("keyword");
  const [_keyword, _setKeyword] = useState<string | undefined>();
  const router = useRouter();
  useEffect(() => _setKeyword(keyword ?? undefined), [keyword]);
  const roleList = useMemo(() => {
    const base = [
      {
        label: "Owner",
        value: "owner",
      },
    ];
    if (user_role == UserRoleEntity.category.GUEST) return base;
    base.unshift({ label: "All", value: "all" });
    base.push({
      label: "Assigned",
      value: "assigned",
    });
    return base;
  }, [user_role]);

  const { data: tasks, refetch } = useQuery({
    queryKey: [
      "list-reports",
      role,
      project_id,
      severity,
      issueType,
      status,
      keyword,
      page,
      phaseId,
    ],
    queryFn: async () => {
      if (!project_id) return { total: 0, items: [] };
      const res = await ReportsService.reportsControllerListReports(
        project_id.toString(),
        role,
        page,
        15,
        severity ?? undefined,
        issueType ?? undefined,
        status ?? undefined,
        keyword ?? undefined,
        phaseId ?? undefined
      );
      return res;
    },
  });
  const {
    data: kanbanTasks,
    fetchNextPage,
    hasNextPage,
    refetch: refetchKanban,
  } = useInfiniteQuery({
    queryKey: [
      "list-reports-kanban",
      role,
      project_id,
      severity,
      issueType,
      keyword,
      phaseId,
    ],
    queryFn: async ({ pageParam }) => {
      if (!project_id) return [];
      const res = await ReportsService.reportsControllerListReports(
        project_id.toString(),
        role,
        pageParam,
        50,
        severity ?? undefined,
        issueType ?? undefined,
        undefined,
        keyword ?? undefined,
        phaseId ?? undefined
      );
      return res.items;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length < 50 ? null : lastPageParam + 1;
    },
  });
  const { data: phases } = useQuery({
    queryKey: ["list-phases", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerFindAllPhases(
        Number(project_id.toString())
      );
      return res;
    },
  });
  const onMoveStatus = useCallback(
    async (id: string, status: string) => {
      const item = tasks?.items.find((item) => item.id.toString() === id);
      if (!item) return;
      if (item?.status !== status)
        await ReportsService.reportsControllerUpdateReport(
          project_id.toString(),
          id,
          {
            status,
          }
        );
    },
    [project_id, tasks]
  );
  const tableColumns: TableProps<ReportListItemEntity>["columns"] = [
    {
      dataIndex: "severity",
      key: "severity",
      render: (value) => <>{getPriorityIconByID(value)}</>,
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Title",
      width: "360px",
      render: (value, { id }) => (
        <Link
          href={`/project/${project_id}/reports/${id}`}
          className="cursor-pointer hover:text-[var(--primary-color)]"
        >
          {value}
        </Link>
      ),
    },
    {
      dataIndex: "type",
      key: "type",
      render: (value?: ReportListItemEntity.type) => (
        <Tag color={value ? REPORT_TYPE_COLOR_MAP[value] : "default"}>
          {value}
        </Tag>
      ),
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      width: "400px",
      render: (value) => (
        <Typography.Paragraph className="!m-0" ellipsis={{ rows: 2 }}>
          {value}
        </Typography.Paragraph>
      ),
    },

    {
      dataIndex: "issueType",
      key: "issueType",
      title: "Type",
      render: (value?: ReportListItemEntity.issueType) => {
        return (
          <Tag color={value ? REPORT_ISSUE_COLOR_MAP[value] : "default"}>
            {value}
          </Tag>
        );
      },
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (value?: ReportListItemEntity.status) => {
        return (
          <Tag color={value ? REPORT_STATUS_COLOR_MAP[value] : "default"}>
            {statusList.find((item) => item.value === value)?.label}
          </Tag>
        );
      },
    },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      title: "Created At",
      render: (value) => {
        return <>{formatDate(value, "date")}</>;
      },
    },
    {
      key: "assignTo",
      title: "Assign",
      render: (_, { assignee }) => {
        return (
          <>
            {assignee ? (
              <Tooltip title={assignee?.username}>
                {assignee?.avatar ? (
                  <Avatar size="small" src={getS3Link(assignee.avatar)} />
                ) : (
                  <Avatar size="small" icon={<UserOutlined />} />
                )}
              </Tooltip>
            ) : (
              <>-</>
            )}
          </>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (_, { id, createdById, status }) => {
        return (
          <Space>
            {createdById == userId && (
              <Button
                icon={<DeleteOutlined />}
                disabled={
                  status !== ReportListItemEntity.status.INIT &&
                  status !== ReportListItemEntity.status.REJECTED
                }
                onClick={async () => {
                  await ReportsService.reportsControllerDeleteReport(
                    id.toString()
                  );
                  await refetch();
                  await refetchKanban();
                }}
              />
            )}
            <Button
              icon={<PlusOutlined />}
              onClick={() =>
                router.push(
                  `/project/${project_id}/tasks/create?reportId=${id}`
                )
              }
              disabled={
                status !== ReportListItemEntity.status.CONFIRMED &&
                status !== ReportListItemEntity.status.IN_PROCESSING
              }
            >
              Task
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer
      className="!max-w-full !w-fit lg:min-w-[1200px]"
      title="Bug Reports List View"
      sideChildren={
        <Segmented
          options={
            user_role == UserRoleEntity.category.GUEST
              ? [{ label: "Table", value: ViewMode.TABLE }]
              : [
                  { label: "Table", value: ViewMode.TABLE },
                  {
                    label: "Kanban",
                    value: ViewMode.KANBAN,
                  },
                ]
          }
          onChange={(value) => setViewMode(value)}
          className="mb-4"
        />
      }
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <Space className="items-center flex-wrap">
          <Segmented
            options={roleList}
            value={role}
            onChange={(value) => {
              setrole(value, { history: "push" });
              setpage(1, { history: "push" });
            }}
          />
          <AppSelect
            value={phaseId}
            onChange={(value) => {
              setphaseId(value, { history: "push" });
              setpage(1, { history: "push" });
            }}
            options={[
              { label: "All Phase", value: null },
              ...(phases?.map((item) => ({
                label: item.name,
                value: item.id,
              })) ?? []),
              { label: "Unknown", value: 0 },
            ]}
            className="w-[120px] h-[32px]"
          />
          <AppSelect
            value={issueType}
            onChange={(value) => {
              setissueType(value, { history: "push" });
              setpage(1, { history: "push" });
            }}
            options={[{ label: "All Type", value: null }, ...issueTypeList]}
            className="w-[120px] h-[32px]"
          />
          <AppSelect
            value={severity}
            onChange={(value) => {
              setseverity(value, { history: "push" });
              setpage(1, { history: "push" });
            }}
            options={[{ label: "All Severity", value: null }, ...severityList]}
            className="w-[120px] h-[32px]"
          />
          {viewMode !== ViewMode.KANBAN && (
            <AppSelect
              value={status}
              onChange={(value) => {
                setstatus(value, { history: "push" });
                setpage(1, { history: "push" });
              }}
              options={[{ label: "All Status", value: null }, ...statusList]}
              className="w-[120px] h-[32px]"
            />
          )}
          <Input
            value={_keyword}
            onChange={(e) => _setKeyword(e.target.value)}
            onPressEnter={() =>
              setkeyword(_keyword ?? null, { history: "push" })
            }
            placeholder="Enter keyword"
          />
        </Space>
        <Space>
          <AppButton
            variant="outlined"
            type="default"
            icon={<LeftOutlined />}
            text=""
            onClick={() => router.back()}
            size="small"
            className="w-fit"
          />
          <Link href={`/project/${project_id}/reports/create`}>
            <AppButton text="Add New" icon={<PlusOutlined />} size="small" />
          </Link>
        </Space>
      </div>
      {viewMode == ViewMode.KANBAN && (
        <div>
          <div className="relative">
            <Tasks
              tasks={kanbanTasks?.pages.flatMap((items) => items.slice())}
              columns={columns}
              onMove={onMoveStatus}
            />
            <div style={{
              display: role == 'assigned'? 'none':'block'
            }} className="absolute top-0 bottom-[20px] right-0 left-0 cursor-not-allowed z-[1]"/>
          </div>
          <div className="mx-auto w-fit mt-3">
            <Button
              icon={<UndoOutlined />}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage}
            >
              Load more
            </Button>
          </div>
        </div>
      )}
      {viewMode == ViewMode.TABLE && (
        <Table
          className="app-table"
          columns={tableColumns}
          dataSource={tasks?.items}
          pagination={{
            pageSize: 15,
            total: tasks?.total ?? 0,
            current: page,
            onChange: (page) => setpage(page, { history: "push" }),
          }}
          scroll={{
            x: "max-content",
          }}
        />
      )}
    </PageContainer>
  );
};

export default ListView;
