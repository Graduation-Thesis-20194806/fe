import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import TitleWrapper from "@/common/components/TitleWrapper";
import { Button, Flex, Image, Input, Radio, Segmented, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { ViewMode } from ".";
import {
  MemberPaginateEntity,
  ReportListItemEntity,
  UpdateReportDto,
} from "../../../../client-sdk";
import AppSelect from "@/common/components/AppSelect";
import { issueTypeList, severityList, statusList } from "../constant";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUpload: (file: any) => void;
  onChangeViewMode: (value: ViewMode) => void;
  members?: MemberPaginateEntity["items"];
};

export function ReportEditView({
  handleUpload,
  onChangeViewMode,
  members,
}: Props) {
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
  return (
    <div>
      <div className="flex flex-col gap-3">
        <Flex justify="space-between" align="center">
          <Segmented<ViewMode>
            options={[ViewMode.REPORT, ViewMode.COMMENTS]}
            onChange={onChangeViewMode}
            value={ViewMode.REPORT}
          />
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Flex>
        <Controller
          control={control}
          name="url"
          render={({ field: { value } }) => (
            <TitleWrapper label="Current Url">
              <Input value={value} disabled />
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
              <Input value={value} onChange={onChange} />
            </TitleWrapper>
          )}
        />
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
        <Flex align="center" justify="flex-start" gap={20}>
          <TitleWrapper label="Issue Type">
            <Controller
              control={control}
              name="issueType"
              render={({ field: { value, onChange } }) => (
                <AppSelect
                  value={value}
                  onChange={onChange}
                  options={issueTypeList}
                  className="w-[150px]"
                />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Severity">
            <Controller
              control={control}
              name="severity"
              render={({ field: { value, onChange } }) => (
                <AppSelect
                  value={value}
                  onChange={onChange}
                  options={severityList}
                  className="w-[100px]"
                />
              )}
            />
          </TitleWrapper>
        </Flex>
        <Flex align="center" justify="flex-start" gap={20}>
          <TitleWrapper label="Status">
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <AppSelect
                  value={value}
                  onChange={onChange}
                  options={statusList}
                  className="w-[100px]"
                />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Assign To">
            <Controller
              control={control}
              name="assignedTo"
              render={({ field: { value, onChange } }) => (
                <AppSelect
                  value={value}
                  onChange={onChange}
                  options={members?.map((item) => ({
                    label: item.username,
                    value: item.id,
                  }))}
                  className="w-[150px]"
                />
              )}
            />
          </TitleWrapper>
        </Flex>
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
              <TextArea value={value} onChange={onChange} />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="stepsToReproduce"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Steps to Reproduce">
              <TextArea value={value} onChange={onChange} />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="expectedBehavior"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Expected Behavior">
              <TextArea value={value} onChange={onChange} />
            </TitleWrapper>
          )}
        />
        <Controller
          control={control}
          name="actualResult"
          render={({ field: { value, onChange } }) => (
            <TitleWrapper label="Actual Result">
              <TextArea value={value} onChange={onChange} />
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
          >
            <Button className="mb-4" icon={<UploadOutlined />}>
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
                  onClick={(e) => {
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
                  }}
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
    </div>
  );
}
