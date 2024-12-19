import BoxContainer from "@/common/components/container/BoxContainer";
import { Button, Input, message } from "antd";
import { useCallback, useEffect } from "react";
import {
  CreateProjectDomainDto,
  ProjectDomainEntity,
  ProjectsService,
  UpdateProjectDomainDto,
} from "../../../client-sdk";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import TitleWrapper from "@/common/components/TitleWrapper";

const ProjectDomainItem = ({
  defaultValue,
  disable,
  onSubmit,
  onDelete,
}: {
  defaultValue?: ProjectDomainEntity;
  disable: boolean;
  onSubmit: (data: CreateProjectDomainDto) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectDomainDto>();
  useEffect(() => {
    if (!defaultValue) return;
    reset(defaultValue);
  }, [defaultValue]);
  return (
    <li>
      <form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={`name`}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { value, onChange } }) => (
            <TitleWrapper error={errors.name?.message}>
              <Input
                value={value}
                onChange={onChange}
                placeholder="Name"
                className="!bg-transparent w-[200px] text-[var(--foreground)] rounded-none focus:shadow-none border-0 border-b-[1px]"
                status={errors.name?.message ? "error" : ""}
              />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name={`url`}
          rules={{
            required: "This field is required",
            pattern: {
              value:
                /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
              message: "Invalid domain name format",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <TitleWrapper error={errors.url?.message} className="flex-grow">
              <Input
                value={value}
                onChange={onChange}
                placeholder="Domain"
                className="!bg-transparent text-[var(--foreground)] rounded-none focus:shadow-none border-0 border-b-[1px]"
                status={errors.url?.message ? "error" : ""}
              />
            </TitleWrapper>
          )}
        />
        {onDelete && (
          <Button
            color="danger"
            variant="outlined"
            className="w-fit"
            onClick={() => {
              if (defaultValue && onDelete) onDelete(defaultValue.id);
            }}
            disabled={disable}
          >
            Delete
          </Button>
        )}
        {!onDelete && (
          <Button
            onClick={() => reset({ name: "", url: "" })}
            variant="outlined"
          >
            Cancel
          </Button>
        )}
        <Button
          color="primary"
          variant="solid"
          className="w-fit"
          htmlType="submit"
        >
          {defaultValue ? "Update" : "Create"}
        </Button>
      </form>
    </li>
  );
};

const ProjectDomain = () => {
  const { project_id } = useParams();
  const { data: domains, refetch } = useQuery({
    queryKey: ["project-domain", project_id],
    queryFn: async () => {
      if (!project_id) return [];
      return await ProjectsService.projectsControllerFindAllProjectDomains(
        project_id.toString()
      );
    },
  });
  const onSubmit = useCallback(
    async (data: CreateProjectDomainDto, id?: number) => {
      try {
        if (!id) {
          await ProjectsService.projectsControllerCreateProjectDomain(
            project_id.toString(),
            data
          );
        } else {
          await ProjectsService.projectsControllerUpdateProjectDomain(
            id?.toString(),
            project_id.toString(),
            data as UpdateProjectDomainDto
          );
        }
        await refetch();
        message.success("Update project domains successfully");
      } catch {
        message.error("Something went wrong");
      }
    },
    [project_id]
  );
  const onDelete = useCallback(
    async (id: number) => {
      await ProjectsService.projectsControllerDeleteProjectDomain(
        id.toString(),
        project_id.toString()
      );
      await refetch();
    },
    [project_id]
  );
  return (
    <BoxContainer title="Domain Settings">
      <ul className="flex flex-col gap-8">
        {domains?.map((item, idx) => (
          <ProjectDomainItem
            defaultValue={item}
            disable={idx == 0}
            key={`project-domain-${idx}`}
            onSubmit={(data) => onSubmit(data, item.id)}
            onDelete={onDelete}
          />
        ))}
        <ProjectDomainItem
          disable
          key={`project-domain-create`}
          onSubmit={(data) => onSubmit(data)}
        />
      </ul>
    </BoxContainer>
  );
};

export default ProjectDomain;
