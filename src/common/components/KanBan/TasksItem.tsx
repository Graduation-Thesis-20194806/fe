/* eslint-disable @typescript-eslint/no-explicit-any */
//import React, { useState, useEffect, useRef } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Row, Col, Badge, Space, Typography, Tag, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  PriorityBacklogOutlined,
  PriorityHighOutlined,
  PriorityNormalOutlined,
  PriorityUrgentOutlined,
} from "./CustomIcons";
import { ReportListItemEntity } from "../../../../client-sdk";
import { getS3Link } from "@/common/helpers/link";

type Props = {
  id: string;
  items: string[];
  name: string;
  data?: ReportListItemEntity[];
  isSortingContainer?: boolean;
  dragOverlay?: any;
};

// Column
export const SectionItem = (props: Props) => {
  const { id, items, name, data, isSortingContainer, dragOverlay } = props;
  const {
    //active,
    attributes,
    isDragging,
    listeners,
    //over,
    setNodeRef,
    setActivatorNodeRef,
    transition,
    transform,
  } = useSortable({
    id: id,
    data: {
      type: "SECTION",
    },
  });

  const getColumnHeight = () => {
    const h = document.getElementsByClassName("kanban-column")[0].clientHeight;
    return h;
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    height: dragOverlay ? `${getColumnHeight() + "px"}` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: dragOverlay
      ? "0 0 0 calc(1px / 1) rgba(63, 63, 68, 0.05), -1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
      : "",
    border: dragOverlay
      ? "1px solid rgba(64, 150, 255, 1)"
      : "1px solid #dcdcdc", // 1px solid rgba(64, 150, 255, 1)
    //cursor: dragOverlay ? "grabbing" : "grab",
    //transform: dragOverlay ? 'rotate(0deg) scale(1.02)' : 'rotate(0deg) scale(1.0)'
    touchAction:
      "ontouchstart" in window || navigator.maxTouchPoints > 0
        ? "manipulation"
        : "none",
  };

  return (
    <div
      ref={setNodeRef}
      className="kanban-column"
      style={style}
      //{...attributes}
      //{...listeners}
    >
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="kanban-column-header"
        style={{
          cursor: dragOverlay ? "grabbing" : "grab",
        }}
      >
        {name}
        <Badge
          count={items.length ? items.length : 0}
          showZero={true}
          style={{
            backgroundColor: "#fff",
            color: "#000",
            marginLeft: "10px",
          }}
        />
      </div>
      <div className="kanban-column-list">
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy} // verticalListSortingStrategy rectSortingStrategy
        >
          {items.map((item) => {
            return (
              <FieldItem
                id={item}
                key={item}
                item={data?.filter((d) => "task-" + d.id === item)[0]}
                disabled={isSortingContainer}
              />
            );
          })}
        </SortableContext>
      </div>
      {/* <div className="kanban-column-footer">
        <Button
          type="text"
          icon={<PlusOutlined />}
          size="small"
          style={{ width: "100%", textAlign: "left" }}
        >
          Add task
        </Button>
      </div> */}
    </div>
  );
};

export const getPriorityIconByID = (id?: ReportListItemEntity.severity) => {
  let icon;
  switch (id) {
    case "INFO":
      icon = <PriorityBacklogOutlined />;
      break;
    case "MEDIUM":
      icon = <PriorityHighOutlined />;
      break;
    case "HIGH":
      icon = <PriorityUrgentOutlined />;
      break;
    case "LOW":
      icon = <PriorityNormalOutlined />;
      break;
    default:
      icon = <PriorityBacklogOutlined />;
      break;
  }
  return icon;
};

type FieldItemProps = {
  id: string;
  item?: ReportListItemEntity;
  dragOverlay?: any;
  disabled?: boolean;
};

// Task
export const FieldItem = (props: FieldItemProps) => {
  const { id, item, dragOverlay } = props;
  const {
    setNodeRef,
    //setActivatorNodeRef,
    listeners,
    isDragging,
    //isSorting,
    //over,
    //overIndex,
    transform,
    transition,
    attributes,
  } = useSortable({
    id: id,
    disabled: props.disabled,
    data: {
      type: "FIELD",
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: dragOverlay
      ? "0 0 0 calc(1px / 1) rgba(63, 63, 68, 0.05), -1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
      : "",
    border: dragOverlay
      ? "1px solid rgba(64, 150, 255, 1)"
      : "1px solid #dcdcdc", // 1px solid rgba(64, 150, 255, 1)
    cursor: dragOverlay ? "grabbing" : "grab",
    //transform: dragOverlay ? 'rotate(0deg) scale(1.02)' : 'rotate(0deg) scale(1.0)'
    touchAction:
      window.PointerEvent ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
        ? "manipulation"
        : "none",
  };
  return (
    <div
      ref={props.disabled ? null : setNodeRef}
      className="card cursor-pointer hover:scale-[102%]"
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="text-[14px]">
        <Row justify="space-between">
          <Col span={20}>
            <div className="font-bold mb-1 hover:text-[var(--primary-color)]">
              {item?.name}
            </div>
            <Typography.Paragraph
              ellipsis={{ rows: 2 }}
              className="text-[10px]"
            >
              {item?.description}
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row
          justify="space-between"
          style={{
            marginTop: "10px",
            color: "#777",
          }}
        >
          <Col>
            <Space align="center" size="middle">
              <Tag>{item?.issueType}</Tag>
            </Space>
          </Col>
          <Col>
            <Space align="center">
              {getPriorityIconByID(item?.severity)}
              {item?.assignee && (
                <Tooltip title={item.assignee?.username}>
                  {item.assignee?.avatar ? (
                    <Avatar
                      size="small"
                      src={getS3Link(item.assignee.avatar)}
                    />
                  ) : (
                    <Avatar
                      icon={<UserOutlined />}
                      key={item.assignedTo}
                      size="small"
                    />
                  )}
                </Tooltip>
              )}
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};
