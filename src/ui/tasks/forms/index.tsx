"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NextPage } from "next";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  DatePicker,
  Upload,
  InputNumber,
  Tag,
  UploadFile,
  message,
  Drawer,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  CreateTaskDto,
  FilesService,
  ProjectsService,
  ReportImageEntity,
  ReportsService,
  TaskCommentsEntity,
  TaskCommentsService,
  TaskCreateCommentDto,
  TaskFullEntity,
  TasksService,
  UpdateTaskDto,
} from "../../../../client-sdk";
import { useParams, useSearchParams } from "next/navigation";
import Tiptap from "@/common/components/Editor";
import axios from "axios";
import { getS3Link } from "@/common/helpers/link";
import TitleWrapper from "@/common/components/TitleWrapper";
import TaskComments from "./Comments";
import { useBoundStore } from "@/store";
import PageContainer from "@/common/components/container/PageContainer";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import dayjs from "dayjs";

const priorityOptions = Object.values(CreateTaskDto.priority).map((p) => ({
  label: p,
  value: p,
}));

const dtoFields = [
  "name",
  "description",
  "estimateTime",
  "deadline",
  "priority",
  "isPublic",
  "statusId",
  "categoryId",
  "references",
  "assignedTo",
  "tags",
  "newAttachments",
  "deleteAttachments",
  "reportId",
  "phaseId",
] as any[];

const changeToUpdateTaskDto = (data: TaskFullEntity): UpdateTaskDto => {
  const result = {} as UpdateTaskDto;
  for (const field of dtoFields) {
    const f1 = field as keyof TaskFullEntity;
    const f2 = field as keyof UpdateTaskDto;
    if (data[f1]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[f2] = data[f1] as any;
    }
  }
  return result;
};

const formatHTML = (
  description: string,
  stepsToReproduce?: string,
  actualResult?: string,
  expectedBehavior?: string,
  reportImage?: ReportImageEntity[]
) => {
  let returnText = `<h1>Bug Report</h1><div>
      <h2>Description</h2>
      <p id="description">${description}.</p>
    </div>`;
  if (stepsToReproduce) {
    returnText += `<div>
        <h2>Steps to Reproduce</h2>
        <p id="stepsToReproduce">${stepsToReproduce}</p>
        </div>`;
  }
  if (actualResult) {
    returnText += `<div>
      <h2>Actual Result</h2>
      <p id="actualResult">${actualResult}</p>
    </div>`;
  }
  if (expectedBehavior) {
    `<div>
      <h2>Expected Behavior</h2>
      <p id="expectedBehavior">${expectedBehavior}</p>
    </div>`;
  }
  if (reportImage?.length) {
    returnText += `
      <h2>Report Image</h2>
      <div>
        ${reportImage
          .map(
            (item) => `<img src="${getS3Link(item.path)}" alt="${item.name}"/>`
          )
          .join("")}
    </div>`;
  }
  return returnText;
};

const CreateIssuePage: NextPage = () => {
  const { project_id, taskid } = useParams();
  const [comments, setComments] = useState<TaskCommentsEntity[] | undefined>();
  
  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId");
  const { userId } = useBoundStore();
  const { data: members } = useQuery({
    queryKey: ["list-members", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerGetMembers(
        project_id.toString()
      );
      return res.items;
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
  const { data: phases } = useQuery({
    queryKey: ["list-phases", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerFindAllPhases(
        Number(project_id.toString())
      );
      return res;
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateTaskDto>({
    defaultValues: {
      name: "",
      description: "",
      estimateTime: undefined,
      deadline: undefined,
      priority: undefined,
      isPublic: false,
      statusId: undefined,
      categoryId: undefined,
      references: [],
      assignedTo: undefined,
      tags: [],
      attachments: [],
    },
  });

  const handleUpload = useCallback(
    async (file: UploadFile) => {
      const fileName = file.name ?? `upload-${new Date().toUTCString()}`;
      const res = await FilesService.filesControllerGetPresignedUrl(
        `project/${project_id}/images/${fileName}`
      );
      const { url } = res;
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      return getS3Link(`project/${project_id}/images/${fileName}`) ?? "";
    },
    [project_id]
  );

  const onEditComment = useCallback(
    async (id: number, createComment: TaskCreateCommentDto) => {
      if (!taskid) return;
      const res = await TaskCommentsService.commentsControllerUpdateComment(
        id.toString(),
        taskid.toString(),
        createComment
      );

      const commentOld = comments?.find((item) => item.id === id);
      if (!commentOld) return;
      commentOld.content = res.content;
      commentOld.updatedAt = res.updatedAt;
      setComments(comments);
    },
    [userId, taskid]
  );
  const onCreateComment = useCallback(
    async (createComment: TaskCreateCommentDto) => {
      if (!taskid) return;
      const res = await TaskCommentsService.commentsControllerCreateComment(
        taskid.toString(),
        project_id.toString(),
        createComment
      );

      if (comments) setComments([...comments, res]);
      else setComments([res]);
    },
    [userId, taskid, project_id]
  );

  useEffect(() => {
    if (taskid) {
      TasksService.tasksControllerGetMyTask(taskid.toString()).then((res) => {
        reset(changeToUpdateTaskDto(res));
        setComments(res.TaskComment);
      });
    }
  }, [taskid]);

  useEffect(() => {
    if (!taskid && reportId) {
      ReportsService.reportsControllerGetMyReport(reportId).then((res) => {
        const {
          assignedTo,
          name,
          description,
          stepsToReproduce,
          actualResult,
          expectedBehavior,
          ReportImage,
          url,
          phaseId,
        } = res;
        reset({
          reportId: Number(reportId),
          assignedTo,
          name,
          references: [url],
          phaseId,
          description: formatHTML(
            description,
            stepsToReproduce,
            actualResult,
            expectedBehavior,
            ReportImage
          ),
        });
      });
    }
  }, [reportId, taskid]);

  const onSubmit = useCallback(
    async (data: CreateTaskDto) => {
      try {
        if (taskid) {
          await TasksService.tasksControllerUpdateTask(
            project_id.toString(),
            taskid.toString(),
            data
          );
        } else {
          await TasksService.tasksControllerCreateTask(
            project_id.toString(),
            data
          );
        }
        message.success("Update successfully");
      } catch (e) {
        message.error("Something wrong");
      }
    },
    [taskid, project_id]
  );

  return (
    <PageContainer title={taskid ? watch("name") : "Create task"}>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 mb-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mb-4"
          >
            <TitleWrapper label="Issue Name" error={errors.name?.message}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter issue name"
                    status={errors.name?.message ? "error" : ""}
                  />
                )}
              />
            </TitleWrapper>

            <TitleWrapper
              label="Description"
              error={errors.description?.message}
            >
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Tiptap
                    handleUpload={handleUpload}
                    content={field.value}
                    onUpdate={field.onChange}
                  />
                )}
              />
            </TitleWrapper>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[160px] mx-auto"
            >
              Create Task
            </Button>
          </form>
          {taskid && (
            <TaskComments
              items={comments}
              user_id={userId ?? 0}
              onEditComment={onEditComment}
              onCreateComment={onCreateComment}
            />
          )}
        </div>

        <div className="flex flex-col gap-3 sticky top-0 right-0 h-fit">
          <TitleWrapper label="Assignee">
            <Controller
              name="assignedTo"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  placeholder="Select a user"
                  allowClear
                  options={members?.map((item) => ({
                    label: item.username,
                    value: item.id,
                  }))}
                />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Estimated Time (hours)">
            <Controller
              name="estimateTime"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  placeholder="e.g. 8"
                  className="w-full"
                />
              )}
            />
          </TitleWrapper>

          <TitleWrapper label="Deadline">
            <Controller
              name="deadline"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  value={value ? dayjs(value) : undefined}
                  onChange={onChange}
                  showTime
                  className="w-full"
                />
              )}
            />
          </TitleWrapper>

          <TitleWrapper label="Priority">
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  placeholder="Select priority"
                  options={priorityOptions}
                  allowClear
                />
              )}
            />
          </TitleWrapper>

          <Controller
            name="isPublic"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                Public
              </Checkbox>
            )}
          />

          <TitleWrapper label="Phase">
            <Controller
              name="phaseId"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  placeholder="Select phase"
                  allowClear
                  options={[
                    ...(phases?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) ?? []),
                    { label: "Unknown", value: undefined },
                  ]}
                />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Status">
            <Controller
              name="statusId"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  placeholder="Select status"
                  allowClear
                  options={statuses?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              )}
            />
          </TitleWrapper>

          <TitleWrapper label="Category">
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  placeholder="Select category"
                  allowClear
                  options={categories?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              )}
            />
          </TitleWrapper>

          <TitleWrapper label="References (URLs)">
            <Controller
              name="references"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  rows={2}
                  placeholder="Enter reference URLs separated by line breaks"
                  onChange={(e) => {
                    field.onChange(e.target.value.split("\n"));
                  }}
                />
              )}
            />
          </TitleWrapper>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateIssuePage;