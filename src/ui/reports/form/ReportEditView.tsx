import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import TitleWrapper from "@/common/components/TitleWrapper";
import {
  Button,
  Flex,
  Image,
  Input,
  Radio,
  Segmented,
  Select,
  Spin,
  Tag,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  DeleteOutlined,
  MergeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ViewMode } from ".";
import {
  MemberPaginateEntity,
  PhaseEntity,
  ReportCompactEntity,
  ReportDuplicateEntity,
  ReportListItemEntity,
  ReportsService,
  TaskCompactEntity,
  UpdateReportDto,
} from "../../../../client-sdk";
import { issueTypeList, severityList, statusList } from "../constant";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUpload: (file: any) => void;
  onChangeViewMode: (value: ViewMode) => void;
  members?: MemberPaginateEntity["items"];
  phases: PhaseEntity[];
  isProcessing: boolean;
  disableEdit: boolean;
  showComment?: boolean;
  refetch: () => Promise<void>;
  tasks?: TaskCompactEntity[];
  childrenReport?: ReportCompactEntity[];
  duplicateReport?: ReportDuplicateEntity[];
};

export function ReportEditView({
  handleUpload,
  onChangeViewMode,
  members,
  phases,
  isProcessing,
  disableEdit,
  showComment = false,
  refetch,
  tasks,
  childrenReport,
  duplicateReport,
}: Props) {
  const { project_id, reportid } = useParams();
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<UpdateReportDto>();
  const imagesWatch = useWatch({ control, name: "images" });
  const { fields, remove } = useFieldArray({
    control,
    name: "additionInfo.domPosition",
  });
  const phaseOptions = useMemo(() => {
    return [
      { label: "Unknown", value: undefined },
      ...phases.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    ];
  }, [phases]);
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col gap-3 col-span-2">
        <Flex justify="space-between" align="center">
          {showComment && (
            <Segmented<ViewMode>
              options={[ViewMode.REPORT, ViewMode.COMMENTS]}
              onChange={onChangeViewMode}
              value={ViewMode.REPORT}
            />
          )}
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Flex>
        <Controller
          control={control}
          name="url"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Current Url">
              <Input value={value} onChange={onChange} disabled />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="phaseId"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Phase">
              <Select
                value={value}
                onChange={onChange}
                options={phaseOptions}
                className="w-full"
                disabled={disableEdit}
              />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="name"
          rules={{
            required: "This field is required",
          }}
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Report Name" error={errors.name?.message}>
              <Input value={value} onChange={onChange} disabled={disableEdit} />
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
            <TitleWrapper
              label="Description"
              error={errors.description?.message}
            >
              <TextArea
                value={value}
                onChange={onChange}
                disabled={disableEdit}
              />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="stepsToReproduce"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Steps to Reproduce">
              <TextArea
                value={value}
                onChange={onChange}
                disabled={disableEdit}
              />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="expectedBehavior"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Expected Behavior">
              <TextArea
                value={value}
                onChange={onChange}
                disabled={disableEdit}
              />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="actualResult"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Actual Result">
              <TextArea
                value={value}
                onChange={onChange}
                disabled={disableEdit}
              />
            </TitleWrapper>
          )}
        />
        <TitleWrapper label="ScreenShot">
          <Upload
            accept="image/*"
            multiple={false}
            showUploadList={false}
            customRequest={({ file }) => {
              handleUpload(file);
            }}
            disabled={disableEdit}
          >
            <Button
              disabled={disableEdit}
              className="mb-4"
              icon={<UploadOutlined />}
            >
              Upload
            </Button>
          </Upload>
          <Flex gap={12} wrap>
            {imagesWatch?.map((item, index) => (
              <a
                href={process.env.NEXT_PUBLIC_AWS_S3_URL + "/" + item.path}
                target="_blank"
                key={item.name}
                style={{ position: "relative" }}
              >
                <Image
                  width={150}
                  src={process.env.NEXT_PUBLIC_AWS_S3_URL + "/" + item.path}
                  preview={false}
                />
                <span
                  className="absolute w-4 h-4 text-[10px] leading-4 text-center bg-black/50 text-white cursor-pointer top-0 right-0 rounded-md translate-x-1/2 -translate-y-1/2 z-10"
                  onClick={
                    disableEdit
                      ? undefined
                      : (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          if (item.id)
                            setValue("deleteImages", [
                              ...(getValues("deleteImages") ?? []),
                              item.id,
                            ]);
                          const images = getValues("images");

                          if (images) {
                            images?.splice(index, 1);
                            setValue("images", images);
                          }
                        }
                  }
                >
                  x
                </span>
              </a>
            ))}
          </Flex>
        </TitleWrapper>
        <TitleWrapper label="Checkpoint">
          {fields?.map((item, index) => (
            <Flex
              gap={4}
              vertical
              style={{ marginBottom: index === fields.length - 1 ? 0 : 8 }}
              key={item.id}
            >
              <Flex gap={4} align="center">
                <Controller
                  control={control}
                  name={`additionInfo.domPosition.${index}.message`}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      style={{ flexGrow: 1 }}
                      value={value}
                      onChange={onChange}
                      disabled={disableEdit}
                    />
                  )}
                />
                <Button
                  color="danger"
                  variant="outlined"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    remove(index);
                  }}
                  disabled={disableEdit}
                />
              </Flex>
              <Controller
                control={control}
                name={`additionInfo.domPosition.${index}.domPath`}
                render={({ field: { value } }) => (
                  <TextArea value={value} disabled />
                )}
              />
            </Flex>
          ))}
        </TitleWrapper>
        <Controller
          control={control}
          name="additionInfo.browser"
          render={({ field: { value } }) => (
            <TitleWrapper label="Browser">
              <Input value={value} disabled />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="additionInfo.browserVersion"
          render={({ field: { value } }) => (
            <TitleWrapper label="Browser Version">
              <Input value={value} disabled />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="additionInfo.os"
          render={({ field: { value } }) => (
            <TitleWrapper label="Operating System">
              <Input value={value} disabled />
            </TitleWrapper>
          )}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Report Type">
              <Radio.Group
                value={value}
                onChange={onChange}
                options={[
                  {
                    label: "Feedback",
                    value: ReportListItemEntity.type.FEEDBACK,
                  },
                  {
                    label: "Bug",
                    value: ReportListItemEntity.type.BUG,
                  },
                  {
                    label: "Wish",
                    value: ReportListItemEntity.type.WISH,
                  },
                ]}
              />
            </TitleWrapper>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <TitleWrapper label="Issue Type" className="relative">
            <Controller
              control={control}
              name="issueType"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  options={issueTypeList}
                  className="w-full"
                  disabled={isProcessing}
                />
              )}
            />
            {isProcessing && (
              <div className="absolute right-0 top-0 w-fit h-fit">
                <Spin size="small" />{" "}
              </div>
            )}
          </TitleWrapper>
          <TitleWrapper label="Severity">
            <Controller
              control={control}
              name="severity"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  options={severityList}
                  className="w-full"
                />
              )}
            />
          </TitleWrapper>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TitleWrapper label="Status">
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  options={statusList}
                  className="w-full"
                />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Assign To">
            <Controller
              control={control}
              name="assignedTo"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  options={members?.map((item) => ({
                    label: item.username,
                    value: item.id,
                  }))}
                  className="w-full"
                />
              )}
            />
          </TitleWrapper>
        </div>
        <TitleWrapper label="Related Tasks">
          {tasks?.map((item) => (
            <div className="flex justify-between p-4 rounded-lg border-[#f1f1f1] w-full">
              <Link href={`/project/${project_id}/tasks/${item.id}`}>
                {item.name}
              </Link>
              <Tag>{item.status}</Tag>
            </div>
          ))}
        </TitleWrapper>
        <TitleWrapper label="Merged Reports">
          {childrenReport?.map((item) => (
            <div className="w-full p-4 rounded-lg border-[#f1f1f1]">
              <Link href={`/project/${project_id}/tasks/${item.id}`}>
                {item.name}
              </Link>
            </div>
          ))}
        </TitleWrapper>
        <TitleWrapper label="Duplicate Report">
          {duplicateReport?.map((item) => (
            <div className="flex justify-between p-4 rounded-lg border-[#f1f1f1]">
              <Link href={`/project/${project_id}/tasks/${item.id}`}>
                {item.name}
              </Link>
              <div>
                <Button
                  size="small"
                  icon={<MergeOutlined />}
                  className="mr-2"
                  onClick={async () => {
                    await ReportsService.reportsControllerMergeReport(
                      reportid.toString(),
                      {
                        childrenId: item.id,
                        type: "merge",
                      }
                    );
                    await refetch()
                  }}
                />
                <Button size="small" icon={<DeleteOutlined />} onClick={async () => {
                    await ReportsService.reportsControllerMergeReport(
                      reportid.toString(),
                      {
                        childrenId: item.id,
                        type: "delete",
                      }
                    );
                    await refetch()
                  }}/>
              </div>
            </div>
          ))}
        </TitleWrapper>
      </div>
    </div>
  );
}
