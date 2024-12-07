"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateCommentDto,
  FilesService,
  MemberPaginateEntity,
  ReportCommentsEntity,
  ReportCommentsService,
  ReportFullEntity,
  ReportsService,
  UpdateReportDto,
} from "../../../../client-sdk";
import { useCallback, useEffect, useState } from "react";
import { ReportEditView } from "./ReportEditView";
import Comments from "./Comments";
import { useBoundStore } from "@/store";
import { useParams } from "next/navigation";
import { UploadFile } from "antd";
import axios from "axios";

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

const ReportForm = ({
  reportid,
  members,
}: {
  reportid?: string;
  members?: MemberPaginateEntity["items"];
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.REPORT);
  const [comments, setComments] = useState<
    ReportCommentsEntity[] | undefined
  >();
  const methods = useForm<UpdateReportDto>();
  const { handleSubmit, reset, getValues, setValue } = methods;
  const onChangeViewMode = (value: ViewMode) => setViewMode(value);
  const { userId } = useBoundStore();
  const { project_id } = useParams();
  const onSubmit = useCallback(
    async (data: UpdateReportDto) => {
      if (reportid) {
        const res = await ReportsService.reportsControllerUpdateReport(
          project_id.toString(),
          reportid.toString(),
          data
        );
        reset(changeToUpdateReportDto(res));
      }
    },
    [reportid, project_id]
  );
  useEffect(() => {
    if (reportid) {
      ReportsService.reportsControllerGetMyReport(reportid.toString()).then(
        (res) => {
          reset(changeToUpdateReportDto(res));
          setComments(res.ReportComment);
        }
      );
    }
  }, [reportid]);
  const handleUpload = useCallback(
    async (file: UploadFile) => {
      const fileName = file.fileName ?? `upload-${new Date().toUTCString()}`;
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
    <div>
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
          />
        </form>
      </FormProvider>
      {userId && (
        <Comments
          onEditComment={onEditComment}
          user_id={userId}
          visible={viewMode === ViewMode.COMMENTS}
          onChangeViewMode={onChangeViewMode}
          items={comments}
          onCreateComment={onCreateComment}
        />
      )}
    </div>
  );
};

export default ReportForm;
