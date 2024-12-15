/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  Popconfirm,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs"; // For date handling
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PhaseEntity, ProjectsService } from "../../../client-sdk";
import BoxContainer from "@/common/components/container/BoxContainer";
import AppButton from "@/common/components/AppButton";
import { PlusOutlined } from "@ant-design/icons";

const PhasePage = () => {
  const { project_id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingPhase, setEditingPhase] = useState<PhaseEntity | null>(null);

  const {
    data: phases,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["list-phases", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerFindAllPhases(
        Number(project_id.toString())
      );
      return res;
    },
  });

  const handleAdd = () => {
    setEditingPhase(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: PhaseEntity) => {
    setEditingPhase(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      from: dayjs(record.from),
      to: dayjs(record.to),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await ProjectsService.projectsControllerRemovePhase(
        Number(project_id.toString()),
        id
      );
      if (!res) throw new Error("Failed to delete phase");
      message.success("Phase deleted");
      await refetch();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        from: values.from.toISOString(),
        to: values.to.toISOString(),
      };

      if (editingPhase) {
        const res = await ProjectsService.projectsControllerUpdatePhase(
          Number(project_id.toString()),
          editingPhase.id,
          payload
        );
        if (!res) throw new Error("Failed to update phase");
        message.success("Phase updated");
      } else {
        const res = await ProjectsService.projectsControllerCreatePhase(
          Number(project_id.toString()),
          payload
        );
        if (!res) throw new Error("Failed to create phase");
        message.success("Phase created");
      }

      setIsModalOpen(false);
      await refetch();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns: ColumnsType<PhaseEntity> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this phase?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <BoxContainer title="Phases Management">
      <Space style={{ marginBottom: 16 }}>
        <AppButton
          type="primary"
          onClick={handleAdd}
          text="Add Phase"
          icon={<PlusOutlined />}
        />
      </Space>
      <Table
        loading={loading}
        columns={columns}
        dataSource={phases}
        rowKey="id"
        className="app-table"
      />
      <Modal
        title={editingPhase ? "Edit Phase" : "Add Phase"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input phase name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="from"
            label="From"
            rules={[{ required: true, message: "Please select a start date" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="to"
            label="To"
            rules={[{ required: true, message: "Please select an end date" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </BoxContainer>
  );
};

export default PhasePage;
