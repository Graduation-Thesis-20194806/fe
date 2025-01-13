import { useBoundStore } from "@/store";
import { useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { NotificationContent, NotificationsService } from "../../../client-sdk";
import { AlertOutlined, UndoOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Button, Segmented } from "antd";
import Link from "next/link";

const ContentToHTML = ({
  projectid,
  content,
  onClick,
}: {
  projectid: number;
  content: NotificationContent;
  onClick: () => void;
}) => {
  const {
    subject,
    action,
    object,
    objectEntity,
    objectAttribute,
    objectAttributeValue,
  } = content;
  let str = `User "${subject.name}" has `;
  let postStr = "";
  let href = "";
  switch (action) {
    case NotificationContent.action.CREATE:
      str += "created ";
      break;
    case NotificationContent.action.UPDATE:
      str += "change ";
      break;
    case NotificationContent.action.DELETE:
      str += "delete ";
      break;
  }
  if (objectAttribute) {
    str += `${objectAttribute} of `;
  }
  if (object)
    switch (objectEntity) {
      case NotificationContent.objectEntity.REPORT:
        str += "report ";
        href = `/project/${projectid}/reports/${object.id}`;
        break;
      case NotificationContent.objectEntity.TASK:
        str += "task ";
        href = `/project/${projectid}/tasks/${object.id}`;
        break;
    }
  if (objectAttributeValue) {
    postStr += ` to ${objectAttributeValue.name}`;
  }
  return (
    <>
      <span>{str}</span>
      {object && (
        <Link className="underline" href={href} onClick={onClick}>
          {object.name}
        </Link>
      )}
      <span>{postStr}</span>
    </>
  );
};

export default function Notifications() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUnSeen, setIsUnSeen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notification, setNotification] = useState<any>();
  const { userId } = useBoundStore();
  const { project_id } = useParams();

  const {
    data: notificationsData,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications", userId, project_id, isUnSeen],
    queryFn: async ({ pageParam }) => {
      if (userId) {
        const res = await NotificationsService.notificationsControllerFindAll(
          pageParam,
          15,
          project_id ? Number(project_id.toString()) : undefined,
          isUnSeen === true ? false : undefined
        );
        if (res) {
          return res;
        }
      }
      return {
        total: 0,
        items: [],
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.items.length < 15 ? null : lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (!userId) return;
    if (socket) return;
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      query: { userId: userId?.toString() },
    });
    console.log(newSocket)
    newSocket.on("notificationCreated", (notification) => {
      setNotification(notification);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [socket, userId]);

  useEffect(() => {
    if (!notification) return;
    if (
      !project_id ||
      notification.projectId.toString() == project_id.toString()
    )
      refetch();
  }, [notification, project_id, refetch]);

  const listNoti = useMemo(() => {
    return {
      items:
        notificationsData?.pages.flatMap((items) => items.items?.slice()) ?? [],
      total: notificationsData?.pages?.at(0)?.total ?? 0,
    };
  }, [notificationsData]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative leading-[1]">
      <button
        onClick={toggleDropdown}
        className={clsx(
          "hover:scale-[102%] inline-flex items-baseline text-white font-semibold focus:outline-none rounded-full px-[10px] h-fit gap-2 py-[6px]",
          {
            "bg-red-600": !!listNoti.total,
            "bg-[var(--primary-color)]": !listNoti.total,
          }
        )}
      >
        <AlertOutlined />
        <span className="leading-[1]">{listNoti.total}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-[100vw] max-w-[400px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-[600px] h-[100vh] overflow-y-auto">
            <Segmented
              options={[
                {
                  label: "Unseen",
                  value: true,
                },
                {
                  label: "All",
                  value: false,
                },
              ]}
              value={isUnSeen}
              onChange={(value) => setIsUnSeen(value)}
              className="my-2 ml-3"
            />
            {listNoti.items.length > 0 ? (
              <>
                {listNoti?.items.map((notif) => (
                  <div
                    key={notif.id}
                    className="block px-4 py-2 text-sm text-gray-700 border-b last:border-b-0 border-gray-200 hover:bg-gray-100"
                  >
                    {!project_id && (
                      <h3
                        className="hover:underline cursor-pointer font-semibold text-gray-800"
                        onClick={() =>
                          router.push(`/project/${notif.projectId}`)
                        }
                      >
                        {notif.ProjectMember.project?.name ?? "Go to Project"}
                      </h3>
                    )}
                    <div className=" text-gray-800">
                      <ContentToHTML
                        projectid={notif.projectId}
                        content={notif.content}
                        onClick={() => {
                          if (!notif.isSeen)
                            NotificationsService.notificationsControllerUpdateNotification(
                              notif.id.toString(),
                              { isSeen: true }
                            );
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(notif.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
                <div className="w-full flex justify-center my-3">
                  <Button
                    icon={<UndoOutlined />}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage}
                  >
                    Load more
                  </Button>
                </div>
              </>
            ) : (
              <div className="block px-4 py-2 text-sm text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
