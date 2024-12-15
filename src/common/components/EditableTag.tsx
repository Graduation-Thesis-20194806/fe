"use client";
import { EditOutlined } from "@ant-design/icons";
import { Input, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

type Props = {
  value: string;
  onUpdate: (value?: string) => Promise<void>;
  className?: string;
};
const EditableTag = ({ value, onUpdate, className }: Props) => {
  const [text, setText] = useState<string | undefined>();
  const [isEditing, setEditing] = useState<boolean>(false);
  useEffect(() => {
    setText(value);
  }, [value]);
  return (
    <Tag className={className}>
      {isEditing && (
        <Input
          size="small"
          className="border-t-0 border-l-0 border-r-0 focus:shadow-none rounded-none bg-transparent"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={async () => {
            await onUpdate(text), setEditing(false);
          }}
        />
      )}
      {!isEditing && (
        <>
          <Typography.Text ellipsis>{value}</Typography.Text>
          <span
            className="cursor-pointer ml-1"
            onClick={() => setEditing(true)}
          >
            <EditOutlined style={{ fontSize: 12 }} />
          </span>
        </>
      )}
    </Tag>
  );
};

export default EditableTag;
