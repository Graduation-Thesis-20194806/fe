import { Button, Spin, Upload, UploadProps } from "antd";
import clsx from "clsx";
type ThumbnailProps = UploadProps & {
  value?: string;
  onDelete?: () => void;
  loading?: boolean;
  message?: React.ReactNode;
};
export default function Thumbnail({
  value,
  onDelete = () => {},
  loading,
  message = <></>,
  className,
  ...props
}: ThumbnailProps) {
  return (
    <div
      style={{
        background: value
          ? `url('${value}') no-repeat center/cover`
          : `url('/images/sample/no-image.png') no-repeat center/auto`,
        backgroundColor: "#e1e1e1",
      }}
      className={clsx(
        "w-full relative overflow-hidden thumbnail-container rounded-[8px]",
        className
      )}
    >
      <div className="absolute inset-0 bg-black/50 hidden flex-col items-center justify-center z-10 gap-4 backdrop">
        <div className="w-[90%] max-w-[600px] text-white text-center text-[1.1rem]">
          {message}
        </div>
        {value && (
          <Button color="danger" variant="filled" onClick={onDelete}>
            Delete Thumbnail
          </Button>
        )}
        <Upload
          maxCount={1}
          showUploadList={false}
          accept="image/png, image/jpeg"
          {...props}
        >
          <Button disabled={loading} color="primary" variant="solid">Choose Image</Button>
        </Upload>
      </div>
      {loading && (
        <div className="flex items-center justify-center absolute inset-0 z-10">
          <Spin />
        </div>
      )}
    </div>
  );
}
