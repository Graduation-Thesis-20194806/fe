"use client";
import { EditOutlined } from "@ant-design/icons";
import { ColorPicker, Input, Tag, TagProps, Typography } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = {
  value: string;
  editable?: boolean;
  onUpdate: (value?: string, color?: string) => Promise<void>;
} & TagProps;
const EditableTag = ({
  value,
  onUpdate,
  className,
  editable = true,
  ...rest
}: Props) => {
  const [text, setText] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [isEditing, setEditing] = useState<boolean>(false);
  useEffect(() => {
    setText(value);
  }, [value]);
  return (
    <div className="flex gap-2 items-center w-full">
      <Tag className={clsx("flex-grow", className)} {...rest}>
        {isEditing && (
          <Input
            size="small"
            className="border-t-0 border-l-0 border-r-0 focus:shadow-none rounded-none bg-transparent"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={async () => {
              await onUpdate(text, color), setEditing(false);
            }}
          />
        )}
        {!isEditing && (
          <>
            <Typography.Text ellipsis>{value}</Typography.Text>
            {editable && (
              <span
                className="cursor-pointer ml-1"
                onClick={() => setEditing(true)}
              >
                <EditOutlined style={{ fontSize: 12 }} />
              </span>
            )}
          </>
        )}
      </Tag>
      {isEditing && (
        <ColorPicker
          value={color}
          onChange={(value) => setColor(value.toHexString())}
        />
      )}
    </div>
  );
};

export default EditableTag;
