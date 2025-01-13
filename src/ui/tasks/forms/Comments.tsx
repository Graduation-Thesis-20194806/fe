import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Flex, Segmented, Space } from "antd";
import { useEffect, useState } from "react";
import {
  TaskCreateCommentDto,
  TaskCommentsEntity,
} from "../../../../client-sdk";
import { formatDate } from "@/common/helpers/date";
import AppInputTextArea from "@/common/components/AppInputTextArea";
type Props = {
  user_id: number;
  items?: TaskCommentsEntity[];
  onCreateComment: (createComment: TaskCreateCommentDto) => void;
  onEditComment: (id: number, editComment: TaskCreateCommentDto) => void;
};
type CommentCardProps = {
  item: TaskCommentsEntity;
  editable: boolean;
  onEditComment: (id: number, editComment: TaskCreateCommentDto) => void;
};

function CommentCard({ item, editable, onEditComment }: CommentCardProps) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<string | undefined>(item.content);
  useEffect(() => {
    setComment(item.content);
  }, [item.content]);
  return (
    <div className="flex gap-2">
      {item.projectMember.user.avatar ? (
        <Avatar
          src={<img src={item.projectMember.user.avatar} alt="avatar" />}
        />
      ) : (
        <Avatar icon={<UserOutlined />} />
      )}
      <div style={{ flexGrow: 1 }}>
        <Flex justify="space-between" style={{ marginBottom: 8 }}>
          <Space>
            <span className="text-[14px] font-bold">
              {item.projectMember.user.username}
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
            className={`rounded-none border-0 bg-transparent disabled:bg-transparent disabled:border-0 focus:!shadow-none`}
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

function TaskComments({
  user_id,
  items,
  onCreateComment,
  onEditComment,
}: Props) {
  const [comment, setComment] = useState<string | undefined>();
  return (
    <div className="relative max-h-[calc(100%-32px)] overflow-y-auto">
      <div className="sticky top-0 left-0 right-0 pb-6">
        <Flex align="center" justify="flex-end" gap={4}>
          <div className="text-[18px] font-bold text-gray-500">{`${
            items?.length ?? 0
          } comment${items?.length && items.length > 1 ? "s" : ""}`}</div>
        </Flex>
        <Divider style={{ marginBlock: 16 }} />
        <Flex align="flex-start" gap={8}>
          <AppInputTextArea
            className={`rounded-none border-0 bg-transparent disabled:bg-transparent disabled:border-0 focus:!shadow-none`}
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
        {items?.map((item) => (
          <CommentCard
            key={item.id}
            item={item}
            onEditComment={onEditComment}
            editable={user_id === item.createdBy}
          />
        ))}
      </Flex>
    </div>
  );
}

export default TaskComments;
