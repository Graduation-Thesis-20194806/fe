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
  Drawer,
  Input,
  Segmented,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import ReportForm from "../form";
import PageContainer from "@/common/components/container/PageContainer";
import AppButton from "@/common/components/AppButton";
import {
  DeleteOutlined,
  ExportOutlined,
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
];
enum ViewMode {
  TABLE = "TABLE",
  KANBAN = "KANBAN",
}
const ListView = () => {
  const { user_role } = useBoundStore();
  const { project_id } = useParams();
  const [reportId, setReportId] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.TABLE);
  const [role, setrole] = useQueryState("role", { defaultValue: "owner" });
  const [page, setpage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [groupId, setgroupId] = useQueryState("groupId", parseAsInteger);
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
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const roleList = useMemo(() => {
    const base = [
      {
        label: "Owner",
        value: "owner",
      },
      {
        label: "Assigned",
        value: "assigned",
      },
    ];
    if (user_role == UserRoleEntity.category.GUEST) return base;
    base.unshift({ label: "All", value: "all" });
    return base;
  }, [user_role]);

  const { data: tasks } = useQuery({
    queryKey: [
      "list-reports",
      role,
      project_id,
      groupId,
      severity,
      issueType,
      status,
      keyword,
      page,
    ],
    queryFn: async () => {
      if (!project_id) return { total: 0, items: [] };
      const res = await ReportsService.reportsControllerListReports(
        project_id.toString(),
        role,
        page,
        15,
        groupId ? Number(groupId) : undefined,
        severity ?? undefined,
        issueType ?? undefined,
        status ?? undefined,
        keyword ?? undefined
      );
      return res;
    },
  });
  const {
    data: kanbanTasks,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "list-reports-kanban",
      role,
      project_id,
      severity,
      issueType,
      keyword,
    ],
    queryFn: async ({ pageParam }) => {
      if (!project_id) return [];
      const res = await ReportsService.reportsControllerListReports(
        project_id.toString(),
        role,
        pageParam,
        50,
        undefined,
        severity ?? undefined,
        issueType ?? undefined,
        undefined,
        keyword ?? undefined
      );
      return res.items;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length < 50 ? null : lastPageParam + 1;
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
  const onMoveStatus = useCallback(
    async (id: string, status: string) => {
      const item = tasks?.items.find((item) => item.id.toString() === id);
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
  const onFieldItemClick = useCallback((id?: number) => {
    setReportId(id);
    showDrawer();
    console.log("here");
  }, []);
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
      render: (value, { id }) => (
        <span
          className="cursor-pointer hover:text-[var(--primary-color)]"
          onClick={() => onFieldItemClick(id)}
        >
          {value}
        </span>
      ),
    },
    {
      dataIndex: "url",
      key: "url",
      render: (value) => (
        <Typography.Link href={value} target="_blank">
          <ExportOutlined />
        </Typography.Link>
      ),
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      width: "20%",
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
      render: (value) => {
        return <Tag>{value}</Tag>;
      },
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (value) => {
        return (
          <Tag>{statusList.find((item) => item.value === value)?.label}</Tag>
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
      key: "note",
      title: "Note",
      render: (_, { groupId }) =>
        groupId ? (
          <Tag
            color="red"
            className="cursor-pointer"
            onClick={() => {
              setgroupId(groupId, { history: "push" });
              setpage(1, { history: "push" });
            }}
          >
            {"Dup"}
          </Tag>
        ) : (
          <></>
        ),
    },
    {
      key: "action",
      title: "Action",
      render: () => {
        return (
          <Space>
            <Button icon={<DeleteOutlined />} />
            <Button icon={<PlusOutlined />}>Task</Button>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer
      className="!max-w-full !w-fit min-w-[1200px]"
      title="Bug Reports List View"
      sideChildren={
        <Segmented
          options={[
            { label: "Table", value: ViewMode.TABLE },
            {
              label: "Kanban",
              value: ViewMode.KANBAN,
            },
          ]}
          onChange={(value) => setViewMode(value)}
          className="mb-4"
        />
      }
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <Space className="items-center">
          <Segmented
            options={roleList}
            value={role}
            onChange={(value) => {
              setrole(value, { history: "push" });
              setpage(1, { history: "push" });
            }}
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
          <AppButton text="Add New" icon={<PlusOutlined />} size="small" />
        </Space>
      </div>
      {viewMode == ViewMode.KANBAN && (
        <div>
          <Tasks
            tasks={kanbanTasks?.pages.flatMap((items) => items.slice())}
            columns={columns}
            onMove={onMoveStatus}
          />
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
        />
      )}
      <Drawer title="Bug Report" onClose={onClose} open={open}>
        <ReportForm reportid={reportId?.toString()} members={members} />
      </Drawer>
    </PageContainer>
  );
};

export default ListView;
