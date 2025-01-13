"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateCommentDto,
  CreateReportDto,
  FilesService,
  ProjectsService,
  ReportCommentsEntity,
  ReportCommentsService,
  ReportCompactEntity,
  ReportDuplicateEntity,
  ReportFullEntity,
  ReportListItemEntity,
  ReportsService,
  TaskCompactEntity,
  UpdateReportDto,
} from "../../../../client-sdk";
import { useCallback, useEffect, useState } from "react";
import { ReportEditView } from "./ReportEditView";
import Comments from "./Comments";
import { useBoundStore } from "@/store";
import { useParams } from "next/navigation";
import { Alert, message, UploadFile } from "antd";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@/common/components/container/PageContainer";

export enum ViewMode {
  REPORT = "REPORT",
  COMMENTS = "COMMENTS",
}
const dtoFields = [
  "name",
  "type",
  "severity",
  "assignedTo",
  "description",
  "stepsToReproduce",
  "expectedBehavior",
  "actualResult",
  "issueType",
  "additionInfo",
  "url",
  "status",
  "phaseId",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any[];
const changeToUpdateReportDto = (data: ReportFullEntity): UpdateReportDto => {
  const result = {} as UpdateReportDto;
  for (const field of dtoFields) {
    const f1 = field as keyof ReportFullEntity;
    const f2 = field as keyof UpdateReportDto;
    if (data[f1]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[f2] = data[f1] as any;
    }
    result.images = data.ReportImage?.map(({ id, name, path }) => ({
      id,
      name,
      path,
    }));
  }
  return result;
};

const ReportForm = ({ reportid }: { reportid?: string }) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.REPORT);
  const [comments, setComments] = useState<
    ReportCommentsEntity[] | undefined
  >();
  const [tasks, setTasks] = useState<TaskCompactEntity[] | undefined>();
  const [childrenReport, setChildrenReport] = useState<
    ReportCompactEntity[] | undefined
  >();
  const [duplicateReport, setDuplicateReport] = useState<
    ReportDuplicateEntity[] | undefined
  >();
  const [disableContentEdit, setDisableContentEdit] = useState(false);
  const [disableMetaEdit, setDisableMetaEdit] = useState(false);
  const [isClosable, setClosable] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const methods = useForm<UpdateReportDto>();
  const { handleSubmit, reset, getValues, setValue } = methods;
  const onChangeViewMode = (value: ViewMode) => setViewMode(value);
  const { userId } = useBoundStore();
  const { project_id } = useParams();
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
  const onSubmit = useCallback(
    async (data: UpdateReportDto) => {
      if (reportid) {
        const res = await ReportsService.reportsControllerUpdateReport(
          project_id.toString(),
          reportid.toString(),
          data
        );
        reset(changeToUpdateReportDto(res));
        message.success("Update successfully");
      } else {
        const res = await ReportsService.reportsControllerCreateReport(
          project_id.toString(),
          data as CreateReportDto
        );
        reset(changeToUpdateReportDto(res));
        message.success("Create successfully");
      }
    },
    [reportid, project_id]
  );

  const refetch = useCallback(async () => {
    if (!reportid) return;
    const res = await ReportsService.reportsControllerGetMyReport(
      reportid.toString()
    );
    if (
      res.createdById !== userId ||
      (res.status !== ReportListItemEntity.status.INIT &&
        res.status !== ReportListItemEntity.status.REJECTED)
    )
      setDisableContentEdit(true);
    if (res.assignedTo && res.assignedTo !== userId) {
      setDisableMetaEdit(true);
    }
    setClosable(res.isClosable);
    reset(changeToUpdateReportDto(res));
    setComments(res.ReportComment);
    setChildrenReport(res.children);
    setTasks(res.Task);
    setDuplicateReport(res.DuplicateGroup);
    setProcessing(res.isProcessing ?? false);
  }, [reportid, userId]);
  useEffect(() => {
    refetch();
  }, [reportid, userId]);
  const handleUpload = useCallback(
    async (file: UploadFile) => {
      const fileName = file.name ?? `upload-${new Date().toUTCString()}`;
      const res = await FilesService.filesControllerGetPresignedUrl(
        `bug-report/${userId}/${fileName}`
      );
      const { url } = res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.ok) {
        const old = getValues("images") ?? [];
        setValue("images", [
          ...old,
          {
            name: fileName,
            path: `bug-report/${userId}/${fileName}`,
          },
        ]);
        const newI = getValues("newImages") ?? [];
        setValue("newImages", [
          ...newI,
          {
            name: fileName,
            path: `bug-report/${userId}/${fileName}`,
          },
        ]);
      }
    },
    [userId]
  );
  const onEditComment = useCallback(
    async (id: number, createComment: CreateCommentDto) => {
      if (!reportid) return;
      const res =
        await ReportCommentsService.reportCommentsControllerUpdateComment(
          id.toString(),
          reportid.toString(),
          createComment
        );

      const commentOld = comments?.find((item) => item.id === id);
      if (!commentOld) return;
      commentOld.content = res.content;
      commentOld.updatedAt = res.updatedAt;
      setComments(comments);
    },
    [userId, reportid]
  );
  const onCreateComment = useCallback(
    async (createComment: CreateCommentDto) => {
      if (!reportid) return;
      const res =
        await ReportCommentsService.reportCommentsControllerCreateComment(
          reportid.toString(),
          createComment
        );

      if (comments) setComments([...comments, res]);
      else setComments([res]);
    },
    [userId, reportid]
  );
  return (
    <PageContainer title={reportid ? "Report" : "Create Report"}>
      {isClosable && (
        <Alert
          type="success"
          message="All related task of this report is done! You can close this report."
          className="mb-3"
        />
      )}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: viewMode === ViewMode.REPORT ? "block" : "none",
          }}
        >
          <ReportEditView
            onChangeViewMode={onChangeViewMode}
            handleUpload={handleUpload}
            members={members}
            phases={phases ?? []}
            isProcessing={isProcessing}
            disableContentEdit={disableContentEdit}
            disableMetaEdit={disableMetaEdit}
            showComment={!!reportid && !!userId}
            refetch={refetch}
            tasks={tasks}
            childrenReport={childrenReport}
            duplicateReport={duplicateReport}
            isClosable={isClosable}
          />
        </form>
      </FormProvider>
      {reportid && userId && (
        <Comments
          onEditComment={onEditComment}
          user_id={userId}
          visible={viewMode === ViewMode.COMMENTS}
          onChangeViewMode={onChangeViewMode}
          items={comments}
          onCreateComment={onCreateComment}
        />
      )}
    </PageContainer>
  );
};

export default ReportForm;
