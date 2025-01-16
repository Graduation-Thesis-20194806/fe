"use client";
import PageContainer from "@/common/components/container/PageContainer";
import {
  Avatar,
  Button,
  ColorPicker,
  Input,
  Segmented,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ProjectsService,
  StatusEntity,
  TaskListItemEntity,
  TasksService,
  UserRoleEntity,
} from "../../../client-sdk";
import { useBoundStore } from "@/store";
import { parseAsInteger, useQueryState } from "nuqs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { formatDate } from "@/common/helpers/date";
import { getS3Link } from "@/common/helpers/link";
import {
  DeleteOutlined,
  GithubOutlined,
  LeftOutlined,
  PlusOutlined,
  UndoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AppButton from "@/common/components/AppButton";
import TitleWrapper from "@/common/components/TitleWrapper";
import EditableTag from "@/common/components/EditableTag";
import AppSelect from "@/common/components/AppSelect";
import { getPriorityIconByID } from "@/common/components/TaskKanBan/TasksItem";
import KanbanTasks from "@/common/components/TaskKanBan/Tasks";
enum ViewMode {
  TABLE = "TABLE",
  KANBAN = "KANBAN",
}

const TaskManagementContainer = () => {
  const { user_role } = useBoundStore();
  const { project_id } = useParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.TABLE);
  const [role, setrole] = useQueryState("role", { defaultValue: "owner" });
  const [page, setpage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [statusId, setstatusId] = useQueryState("statusId", parseAsInteger);
  const [phaseId, setphaseId] = useQueryState("phaseId", parseAsInteger);
  const [categoryId, setcategoryId] = useQueryState(
    "categoryId",
    parseAsInteger
  );
  const [status, setStatus] = useState<string | undefined>();
  const [statusColor, setStatusColor] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [categoryColor, setCategoryColor] = useState<string | undefined>();
  const [keyword, setkeyword] = useQueryState("keyword");
  const [_keyword, _setKeyword] = useState<string | undefined>();
  useEffect(() => _setKeyword(keyword ?? undefined), [keyword]);
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
      page,
      keyword,
      categoryId,
      statusId,
      phaseId,
    ],
    queryFn: async () => {
      if (!project_id) return { total: 0, items: [] };
      const res = await TasksService.tasksControllerListTasks(
        project_id.toString(),
        role,
        page,
        15,
        keyword ?? undefined,
        categoryId ?? undefined,
        statusId ?? undefined,
        phaseId ?? undefined
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
      keyword,
      categoryId,
      phaseId,
    ],
    queryFn: async ({ pageParam }) => {
      if (!project_id) return [];
      const res = await TasksService.tasksControllerListTasks(
        project_id.toString(),
        role,
        pageParam,
        50,
        keyword ?? undefined,
        categoryId ?? undefined,
        undefined,
        phaseId ?? undefined
      );
      return res.items;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length < 50 ? null : lastPageParam + 1;
    },
  });
  const { data: statuses, refetch: mutateStatus } = useQuery({
    queryKey: ["list-statuses", project_id],
    queryFn: async () => {
      if (!project_id) return [];
      const res = await ProjectsService.projectsControllerFindAllStatus(
        project_id.toString()
      );
      return res;
    },
  });
  const { data: categories, refetch: mutateCategory } = useQuery({
    queryKey: ["list-categories", project_id],
    queryFn: async () => {
      if (!project_id) return [];
      const res = await ProjectsService.projectsControllerFindAllCategory(
        project_id.toString()
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
  const { data: phases } = useQuery({
    queryKey: ["list-phases", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerFindAllPhases(
        Number(project_id.toString())
      );
      return res;
    },
  });
  const tableColumns: TableProps<TaskListItemEntity>["columns"] = useMemo(
    () => [
      {
        dataIndex: "priority",
        key: "priority",
        render: (value) => <>{getPriorityIconByID(value)}</>,
      },
      {
        dataIndex: "name",
        key: "name",
        title: "Title",
        render: (value, { id }) => (
          <Link href={`/project/${project_id}/tasks/${id}`}>{value}</Link>
        ),
      },
      {
        key: "githubLink",
        render: (_, { IssueGithub }) =>
          IssueGithub ? (
            <a target="_blank" href={IssueGithub.url}>
              <GithubOutlined />
            </a>
          ) : (
            <></>
          ),
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
        render: (_, { Assignee }) => {
          return (
            <>
              {Assignee ? (
                <Tooltip title={Assignee.user?.username}>
                  {Assignee.user?.avatar ? (
                    <Avatar
                      size="small"
                      src={getS3Link(Assignee.user.avatar)}
                    />
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
        key: "estTime",
        dataIndex: "estimateTime",
        title: "EST",
        render: (value) => (value ? <>{value}h</> : <></>),
      },
      {
        key: "deadline",
        dataIndex: "deadline",
        title: "Deadline",
        render: (value) => (value ? <>{formatDate(value)}</> : <></>),
      },
      {
        key: "status",
        dataIndex: "statusId",
        title: "Status",
        render: (value) => (
          <Tag color={statuses?.find((item) => item.id == value)?.color}>
            {statuses?.find((item) => item.id == value)?.name}
          </Tag>
        ),
      },
      {
        key: "category",
        dataIndex: "categoryId",
        title: "Category",
        render: (value) => (
          <Tag color={categories?.find((item) => item.id == value)?.color}>
            {categories?.find((item) => item.id == value)?.name}
          </Tag>
        ),
      },
      {
        key: "bugReport",
        title: "Report",
        render: (_, { Report, reportId }) => (
          <>
            {Report && (
              <Link href={`/project/${project_id}/reports/${reportId}`}>
                <Tag className="cursor-pointer">
                  <Typography.Text
                    ellipsis
                    className="!text-[12px] !max-w-[100px]"
                  >
                    {Report?.name}
                  </Typography.Text>
                </Tag>
              </Link>
            )}
          </>
        ),
      },
      {
        key: "action",
        title: "Action",
        render: (_, { id }) => {
          return (
            <Space>
              <Button icon={<DeleteOutlined />} />
            </Space>
          );
        },
      },
    ],
    [categories, statuses]
  );
  const onAddStatus = useCallback(async () => {
    if (!status) return;
    await ProjectsService.projectsControllerCreateStatus(
      project_id.toString(),
      { name: status, color: statusColor }
    );
    await mutateStatus();
    setStatus(undefined);
    setStatusColor(undefined);
  }, [project_id, status]);
  const onUpdateStatus = useCallback(
    async (id: number, status?: string, color?: string) => {
      if (!status) return;
      await ProjectsService.projectsControllerUpdateStatus(
        id,
        project_id.toString(),
        { name: status, color }
      );
      await mutateStatus();
    },
    [project_id]
  );
  const onAddCategory = useCallback(async () => {
    if (!category) return;
    await ProjectsService.projectsControllerCreateCategory(
      project_id.toString(),
      { name: category, color: categoryColor }
    );
    await mutateCategory();
    setCategory(undefined);
    setCategoryColor(undefined);
  }, [project_id, category]);
  const onUpdateCategory = useCallback(
    async (id: number, category?: string, color?: string) => {
      if (!category) return;
      await ProjectsService.projectsControllerUpdateCategory(
        id,
        project_id.toString(),
        { name: category, color }
      );
      await mutateCategory();
    },
    [project_id]
  );
  const onMoveStatus = useCallback(
    async (id: string, status: string) => {
      const item = tasks?.items.find((item) => item.id.toString() === id);
      if (!item) return;
      if (item.statusId?.toString() !== status)
        await TasksService.tasksControllerUpdateTask(
          project_id.toString(),
          id,
          {
            statusId: Number(status),
          }
        );
    },
    [project_id, tasks]
  );
  return (
    <PageContainer
      title="Task Management"
      className="!max-w-full lg:min-w-[1200px]"
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
            value={categoryId}
            onChange={(value) => {
              setstatusId(value, { history: "push" });
              setpage(1, { history: "push" });
            }}
            options={[
              { label: "All Categories", value: null },
              ...(categories?.map((i) => ({
                label: i.name,
                value: i.id,
              })) ?? []),
            ]}
            className="w-[120px] h-[32px]"
          />
          {viewMode !== ViewMode.KANBAN && (
            <AppSelect
              value={statusId}
              onChange={(value) => {
                setstatusId(value, { history: "push" });
                setpage(1, { history: "push" });
              }}
              options={[
                { label: "All Statuses", value: null },
                ...(statuses?.map((i) => ({
                  label: i.name,
                  value: i.id,
                })) ?? []),
              ]}
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
          <KanbanTasks
            tasks={kanbanTasks?.pages.flatMap((items) => items.slice())}
            columns={statuses?.map((item, idx) => ({
              id: item.id.toString(),
              name: item.name,
              order: idx + 1,
            }))}
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
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-5">
            <Table
              className="app-table w-full"
              columns={tableColumns}
              dataSource={tasks?.items}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 15,
                total: tasks?.total ?? 0,
                current: page,
                onChange: (page) => setpage(page, { history: "push" }),
              }}
            />
          </div>
          <div>
            <TitleWrapper label="Status" className="mb-6">
              <div className="flex flex-col gap-2">
                {statuses?.map((item, idx) => (
                  <EditableTag
                    key={`status-${idx}`}
                    color={item.color}
                    className="inline-flex justify-between items-center h-8"
                    value={item.name}
                    onUpdate={(value, color) =>
                      onUpdateStatus(item.id, value, color)
                    }
                    editable={item.category !== StatusEntity.category.CLOSE}
                  />
                ))}
                <span className="inline-flex gap-2 items-center">
                  <Input
                    value={status}
                    placeholder="Add Status"
                    onPressEnter={() => onAddStatus()}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-none focus:shadow-none border-t-0 border-l-0 border-r-0"
                  />
                  <ColorPicker
                    value={statusColor}
                    onChange={(value) => setStatusColor(value.toHexString())}
                  />
                </span>
              </div>
            </TitleWrapper>
            <TitleWrapper label="Category">
              <div className="flex flex-col gap-2">
                {categories?.map((item, idx) => (
                  <EditableTag
                    color={item.color}
                    key={`category-${idx}`}
                    className="inline-flex justify-between items-center h-8"
                    value={item.name}
                    onUpdate={(value, color) =>
                      onUpdateCategory(item.id, value, color)
                    }
                  />
                ))}
                <div className="inline-flex gap-2 items-center">
                  <Input
                    value={category}
                    placeholder="Add Category"
                    onPressEnter={() => onAddCategory()}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-none focus:shadow-none border-t-0 border-l-0 border-r-0"
                  />
                  <ColorPicker
                    value={categoryColor}
                    onChange={(value) => setCategoryColor(value.toHexString())}
                  />
                </div>
              </div>
            </TitleWrapper>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default TaskManagementContainer;
