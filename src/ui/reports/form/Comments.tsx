import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Flex, Segmented, Space } from "antd";
import { useEffect, useState } from "react";
import { ViewMode } from ".";
import { CreateCommentDto, ReportCommentsEntity } from "../../../../client-sdk";
import { formatDate } from "@/common/helpers/date";
import AppInputTextArea from "@/common/components/AppInputTextArea";
type Props = {
  user_id: number;
  items?: ReportCommentsEntity[];
  onCreateComment: (createComment: CreateCommentDto) => void;
  onEditComment: (id: number, editComment: CreateCommentDto) => void;
  onChangeViewMode: (value: ViewMode) => void;
  visible: boolean;
};
type CommentCardProps = {
  item: ReportCommentsEntity;
  editable: boolean;
  onEditComment: (id: number, editComment: CreateCommentDto) => void;
};

function CommentCard({ item, editable, onEditComment }: CommentCardProps) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<string | undefined>(item.content);
  useEffect(() => {
    setComment(item.content);
  }, [item.content]);
  return (
    <div className="flex gap-2">
      {item.createdBy.avatar ? (
        <Avatar src={<img src={item.createdBy.avatar} alt="avatar" />} />
      ) : (
        <Avatar icon={<UserOutlined />} />
      )}
      <div style={{ flexGrow: 1 }}>
        <Flex justify="space-between" style={{ marginBottom: 8 }}>
          <Space>
            <span className="text-[14px] font-bold">
              {item.createdBy.username}
            </span>
            <span className="text-[10px] font-normal text-gray-400">
              {item.createdAt === item.updatedAt
                ? formatDate(item.createdAt)
                : `edited at ${formatDate(item.updatedAt)}`}
            </span>
          </Space>
          <Space>
            {editable && (
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setEditing((isEditing) => !isEditing);
                  setComment(item.content);
                }}
                variant={isEditing ? "filled" : "outlined"}
              />
            )}
          </Space>
        </Flex>
        <Flex align="flex-start" gap={8}>
          <AppInputTextArea
            placeholder="Write some thing"
            className={`rounded-none border-0 bg-transparent disabled:bg-transparent disabled:border-0 focus:outline-none`}
            autoSize={{
              minRows: 1,
              maxRows: 7,
            }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!isEditing}
          />
          {isEditing && (
            <Button
              color="primary"
              onClick={() => {
                onEditComment(item.id, { content: comment ?? "" });
                setEditing(false);
              }}
              disabled={!comment}
            >
              Post
            </Button>
          )}
        </Flex>
      </div>
    </div>
  );
}

function Comments({
  user_id,
  items,
  onChangeViewMode,
  onCreateComment,
  onEditComment,
  visible,
}: Props) {
  const [comment, setComment] = useState<string | undefined>();
  return (
    <div
      className="relative max-h-[calc(100%-32px)] overflow-y-auto"
      style={{ display: visible ? "block" : "none" }}
    >
      <div className="sticky top-0 left-0 right-0 pb-6">
        <Flex align="center" justify="space-between" gap={4}>
          <Segmented<ViewMode>
            options={[ViewMode.REPORT, ViewMode.COMMENTS]}
            onChange={onChangeViewMode}
            value={ViewMode.COMMENTS}
          />
          <div className="text-[18px] font-bold text-gray-500">{`${
            items?.length ?? 0
          } comment${items?.length && items.length > 1 ? "s" : ""}`}</div>
        </Flex>
        <Divider style={{ marginBlock: 16 }} />
        <Flex align="flex-start" gap={8}>
          <AppInputTextArea
            className={`rounded-none border-0 bg-transparent disabled:bg-transparent disabled:border-0 focus:outline-none`}
            placeholder="Write some thing"
            autoSize={{
              minRows: 1,
              maxRows: 7,
            }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            color="primary"
            onClick={() => {
              onCreateComment({ content: comment ?? "" });
              setComment(undefined);
            }}
            disabled={!comment}
          >
            Post
          </Button>
        </Flex>
      </div>
      <Flex vertical gap={16}>
        {items?.map((item, idx) => (
          <CommentCard
            key={`comment-${idx}`}
            item={item}
            onEditComment={onEditComment}
            editable={user_id === item.createdById}
          />
        ))}
      </Flex>
    </div>
  );
}

export default Comments;
