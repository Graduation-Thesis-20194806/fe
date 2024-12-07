import React, { useState } from "react";
import {
  Card,
  List,
  Segmented,
  Pagination,
  Grid,
  Space,
  Input,
  Typography,
} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { ProjectEntity, ProjectsService } from "../../../client-sdk";
import { useQuery } from "@tanstack/react-query";
import AppButton from "@/common/components/AppButton";
const { Title } = Typography;
const PAGE_SIZE = 20;
const MyProject = () => {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["list-projects", currentPage],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerListProjects(
        currentPage,
        PAGE_SIZE
      );
      setTotal(res.total);
      return res.items;
    },
  });

  const renderCardView = () => (
    <div className="grid grid-cols-4 gap-4 py-6">
      {projects?.map((project) => (
        <Card
          key={project.id}
          hoverable
          cover={
            <img
              className="h-[200px] object-cover"
              alt={project.name}
              src={
                project.projectThumbnail ??
                `images/sample/project_sample_${
                  Math.floor(Math.random() * 4) + 1
                }.jpg`
              }
            />
          }
        >
          <Card.Meta
            title={<Link href={`/project/${project.id}`}>{project.name}</Link>}
            description={project.description}
          />
          <div style={{ marginTop: "8px", color: "rgba(0, 0, 0, 0.45)" }}>
            Created At: {dayjs(project.createdAt).format("YYYY/MM/DD")}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <List
      className="py-3"
      itemLayout="horizontal"
      dataSource={projects}
      renderItem={(project) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <img
                className="w-[80px] h-[60px] object-cover"
                alt={project.name}
                src={
                  project.projectThumbnail ??
                  `images/sample/project_sample_${
                    Math.floor(Math.random() * 4) + 1
                  }.jpg`
                }
              />
            }
            title={<Link href={`/project/${project.id}`}>{project.name}</Link>}
            description={project.description}
          />
          <div style={{ color: "rgba(0, 0, 0, 0.45)" }}>
            Created At: {dayjs(project.createdAt).format("YYYY/MM/DD")}
          </div>
        </List.Item>
      )}
    />
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8">
      <Title>My Project</Title>
      <div className="flex justify-between">
        <Space>
          <Input.Search className="app-input"/>
          <AppButton text="Create New" size="small" />
        </Space>
        <Segmented
          options={[
            { label: "Card View", value: "card" },
            { label: "List View", value: "list" },
          ]}
          value={viewMode}
          onChange={(value) => setViewMode(value as "card" | "list")}
        />
      </div>
      {viewMode === "card" ? renderCardView() : renderListView()}
      <div className=" flex justify-center mt-4">
        <Pagination
          current={currentPage}
          showSizeChanger={false}
          total={total}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default MyProject;