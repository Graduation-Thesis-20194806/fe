"use client"
import BoxContainer from "@/common/components/container/BoxContainer";
import Thumbnail from "@/common/components/Thumbnail";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  CreateProjectDto,
  FilesService,
  ProjectsService,
  UpdateProjectDto,
} from "../../../client-sdk";
import { Button, Input, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TitleWrapper from "@/common/components/TitleWrapper";
import { DeleteOutlined } from "@ant-design/icons";
import { getS3Link } from "@/common/helpers/link";

const ProjectForm = ({ projectId }: { projectId?: string }) => {
  const router = useRouter();
  const methods = useForm<CreateProjectDto>({
    defaultValues: {
      projectDomain: [{ name: "", url: "" }],
    },
  });
  const {
    control,
    setValue,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projectDomain",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!projectId) return;
    ProjectsService.projectsControllerGetProject(projectId).then(
      (res) => {
        reset(res);
      }
    );
  }, [projectId, reset]);
  const customRequest = async ({ file, onSuccess }: RcCustomRequestOptions) => {
    const fil = file as RcFile;
    const isLt5M = fil.size / 1024 / 1024 <= 5;
    if (!isLt5M) {
      message.error("Dung lương ảnh vượt quá giới hạn (>5MB)");
      return;
    }
    setLoading(true);

    const fileName = `thumbnail-${new Date().toUTCString()}`;
    const res = await FilesService.filesControllerGetPresignedUrl(
      `project/thumbnail/${fileName}`
    );
    const { url } = res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await axios.put(url, file, {
      headers: {
        "Content-Type": fil.type,
      },
    });
    console.log(response)

    if (response.status == 200) {
      setValue("projectThumbnail", `project/thumbnail/${fileName}`, {
        shouldDirty: true,
      });
    }
    setLoading(false)
    onSuccess?.(true);
  };
  const onDelete = async () => {
    setValue("projectThumbnail", undefined);
  };
  const onSubmit = useCallback(
    async (data: CreateProjectDto) => {
      try {
        if (!projectId) {
          const project = await ProjectsService.projectsControllerCreateProject(
            data
          );
          message.success("Create successfully");
          router.push(`/project/${project.id}`);
        } else {
          delete data.projectDomain;
          await ProjectsService.projectsControllerUpdateProject(
            projectId.toString(),
            data as UpdateProjectDto
          );
          message.success("Update successfully");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        message.error("Something went wrong");
      }
    },
    [router, projectId]
  );
  return (
    <BoxContainer className="mb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <Controller
            control={control}
            name="projectThumbnail"
            render={({ field: { value } }) => (
              <Thumbnail
                className="aspect-[5/2]"
                loading={loading}
                customRequest={customRequest}
                value={getS3Link(value)}
                onDelete={onDelete}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            rules={{
              required: "This field is required",
            }}
            render={({ field: { value, onChange } }) => (
              <TitleWrapper error={errors.name?.message}>
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="Project Name"
                  className="!bg-transparent text-[var(--foreground)] font-bold text-[1.5rem] rounded-none focus:shadow-none border-0 border-b-[1px]"
                  status={errors.name?.message ? "error" : ""}
                />
              </TitleWrapper>
            )}
          />
          <Controller
            control={control}
            name="description"
            rules={{
              required: "This field is required",
            }}
            render={({ field: { value, onChange } }) => (
              <TitleWrapper error={errors.description?.message}>
                <TextArea
                  value={value}
                  onChange={onChange}
                  placeholder="Project description"
                  className="!bg-transparent text-[var(--foreground)] rounded-none text-[1.125rem] focus:shadow-none border-0 border-b-[1px]"
                  status={errors.description?.message ? "error" : ""}
                  autoSize={{
                    minRows: 1,
                    maxRows: 7,
                  }}
                />
              </TitleWrapper>
            )}
          />
          {!projectId && (
            <BoxContainer
              level={2}
              title="Project Domains"
              sideChildren={
                <Button onClick={() => append({ name: "", url: "" })}>
                  Add
                </Button>
              }
            >
              <ul className="flex flex-col gap-3">
                {fields?.map((item, idx) => (
                  <li key={`project-domain-${idx}`} className="flex gap-3">
                    <Controller
                      control={control}
                      name={`projectDomain.${idx}.name`}
                      rules={{
                        required: "This field is required",
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TitleWrapper
                          error={errors.projectDomain?.[idx]?.name?.message}
                        >
                          <Input
                            value={value}
                            onChange={onChange}
                            placeholder="Name"
                            className="!bg-transparent w-[200px] text-[var(--foreground)] rounded-none focus:shadow-none border-0 border-b-[1px]"
                            status={
                              errors.projectDomain?.[idx]?.name?.message
                                ? "error"
                                : ""
                            }
                          />
                        </TitleWrapper>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`projectDomain.${idx}.url`}
                      rules={{
                        required: "This field is required",
                        pattern: {
                          value:
                            /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
                          message: "Invalid domain name format",
                        },
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TitleWrapper
                          error={errors.projectDomain?.[idx]?.url?.message}
                          className="flex-grow"
                        >
                          <Input
                            value={value}
                            onChange={onChange}
                            placeholder="Domain"
                            className="!bg-transparent text-[var(--foreground)] rounded-none focus:shadow-none border-0 border-b-[1px]"
                            status={
                              errors.projectDomain?.[idx]?.url?.message
                                ? "error"
                                : ""
                            }
                          />
                        </TitleWrapper>
                      )}
                    />
                    <Button
                      color="danger"
                      variant="outlined"
                      className="w-[50px]"
                      onClick={() => remove(idx)}
                      disabled={idx == 0}
                    >
                      <DeleteOutlined />
                    </Button>
                  </li>
                ))}
              </ul>
            </BoxContainer>
          )}
          <div className="w-full flex justify-end gap-4">
            <Link href={"/project"}>
              <Button color="default">Cancel</Button>
            </Link>
            <Button
              htmlType="submit"
              color="primary"
              variant="solid"
              className="shadow-none"
              disabled={!isDirty}
            >
              {projectId ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </div>
      </form>
    </BoxContainer>
  );
};

export default ProjectForm;
