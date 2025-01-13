import React, { useMemo, useState } from "react";
import { Card, Row, Col, Statistic, Segmented, DatePicker, Select } from "antd";
import { Pie, Bar } from "react-chartjs-2";
import "antd/dist/reset.css"; // If using AntD v5, style import path may differ
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Chart as ChartJS } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  ProjectsService,
  StatisticService,
  UserRoleEntity,
} from "../../../client-sdk";
import { useBoundStore } from "@/store";
import { useQueryState } from "nuqs";
import { getS3Link } from "@/common/helpers/link";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardContainer = () => {
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();
  const { user_role } = useBoundStore();
  const { project_id } = useParams();
  const { data: project } = useQuery({
    queryKey: ["project", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerGetProject(
        project_id.toString()
      );
      return res;
    },
  });
  const [role, setrole] = useQueryState("role", { defaultValue: "owner" });

  const { data: members } = useQuery({
    queryKey: ["list-members", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerGetMembers(
        project_id.toString()
      );
      return res.items;
    },
  });
  const { data: reportStatusCount } = useQuery({
    queryKey: ["report-status-count", role, from, to],
    queryFn: async () => {
      if (!project_id) return [];
      const res = StatisticService.statisticControllerGetReportStatusCount(
        project_id?.toString(),
        role,
        from,
        to
      );
      return res;
    },
  });
  const { data: reportTypeCount } = useQuery({
    queryKey: ["report-type-count", role, from, to],
    queryFn: async () => {
      if (!project_id) return [];
      const res = StatisticService.statisticControllerGetReportTypeCount(
        project_id?.toString(),
        role,
        from,
        to
      );
      return res;
    },
  });
  const { data: reportIssueTypeCount } = useQuery({
    queryKey: ["report-issue-type-count", role, from, to],
    queryFn: async () => {
      if (!project_id) return [];
      const res = StatisticService.statisticControllerGetReportIssueTypeCount(
        project_id?.toString(),
        role,
        from,
        to
      );
      return res;
    },
  });
  const { data: reportSeverityCount } = useQuery({
    queryKey: ["report-severity-count", role, from, to],
    queryFn: async () => {
      if (!project_id) return [];
      const res = StatisticService.statisticControllerGetReportSeverityCount(
        project_id?.toString(),
        role,
        from,
        to
      );
      return res;
    },
  });
  const { data: reportsByTime } = useQuery({
    queryKey: ["report-by-time", role, from, to],
    queryFn: async () => {
      if (!project_id) return [];
      const res = StatisticService.statisticControllerGetReportStatisticByTime(
        project_id?.toString(),
        role,
        from,
        to
      );
      return res;
    },
  });

  const { data: reportsByMember } = useQuery({
    queryKey: ["report-by-member", role, from, to],
    queryFn: async () => {
      if (!project_id) return [];
      const res =
        StatisticService.statisticControllerGetReportStatisticByMember(
          project_id?.toString(),
          role,
          from,
          to
        );
      return res;
    },
  });

  const { data: phases } = useQuery({
    queryKey: ["list-phases", project_id],
    queryFn: async () => {
      const res = await ProjectsService.projectsControllerFindAllPhases(
        Number(project_id.toString())
      );
      return res;
    },
  });

  const roleList = useMemo(() => {
    const base = [
      {
        label: "Owner",
        value: "owner",
      },
      {
        label: "Assigned",
        value: "assigned",
      },
    ];
    if (user_role == UserRoleEntity.category.GUEST) return base;
    base.unshift({ label: "All", value: "all" });
    return base;
  }, [user_role]);

  //Status - Pie
  const statusLabels = reportStatusCount?.map((item) => item.status);
  const statusData = reportStatusCount?.map((item) => item.count);

  const statusPieData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusData,
        backgroundColor: [
          "#344640",
          "#5E744F",
          "#798A66",
          "#DCD6B8",
          "#D2A764",
        ],
      },
    ],
  };

  // Report Type distribution - Pie
  const typeLabels = reportTypeCount?.map((item) => item.type);
  const typeData = reportTypeCount?.map((item) => item.count);
  const typePieData = {
    labels: typeLabels,
    datasets: [
      {
        data: typeData,
        backgroundColor: ["#FDE6B0", "#D35944", "#5D7275"],
      },
    ],
  };

  // Report Type distribution - Pie
  const severityLabels = reportSeverityCount?.map((item) => item.severity);
  const severityData = reportSeverityCount?.map((item) => item.count);
  const severityPieData = {
    labels: severityLabels,
    datasets: [
      {
        data: severityData,
        backgroundColor: ["#D5AA61", "#E4844D", "#E7DBBC", "#CB5D46"],
      },
    ],
  };

  // Report issue Type distribution - Pie
  const issueTypeLabels = reportIssueTypeCount?.map((item) => item.issueType);
  const issueTypeData = reportIssueTypeCount?.map((item) => item.count);
  const issueTypePieData = {
    labels: issueTypeLabels,
    datasets: [
      {
        data: issueTypeData,
        backgroundColor: [
          "#936D69",
          "#76A5AF",
          "#DFD0BD",
          "#DAAC88",
          "#89A283",
          "#BE5C5C",
          "#f9f4f2",
        ],
      },
    ],
  };

  // Reports per Time
  const memberLabels = reportsByMember?.map((item) => {
    const member = members?.find((it) => it.id == item.userId);
    return member?.username;
  });
  const memberData = reportsByMember?.map((item) => item.count);
  const reportsByMemberData = {
    labels: memberLabels,
    datasets: [
      {
        label: "Reports Created",
        data: memberData,
        backgroundColor: "rgba(103, 78, 66,0.6)",
      },
    ],
  };

  // Reports per Member
  const timeLabels = reportsByTime?.map((item) => item.date);
  const timeData = reportsByTime?.map((item) => item.count);
  const reportsByMonthBarData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Reports Created",
        data: timeData,
        backgroundColor: "rgba(121, 138, 102,0.6)",
      },
    ],
  };

  // Another statistic: sum of all reports for a quick "total" metric
  const totalReports = reportStatusCount?.reduce(
    (sum, item) => sum + (item?.count ?? 0),
    0
  );

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden p-4">
      <div className="w-full max-w-[1440px] mx-auto">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={16}>
            <div
              className="w-full mb-6 h-full bg-cover bg-no-repeat bg-center rounded-lg project-thumbnail p-4 overflow-hidden text-white"
              style={{
                backgroundImage: `url('${
                  project?.projectThumbnail
                    ? getS3Link(project.projectThumbnail)
                    : `/images/sample/project_sample_${
                        Math.floor(Math.random() * 4) + 1
                      }.jpg`
                }')`,
              }}
            >
              <h1 className="font-bold text-[2rem] mb-3 z-[1] relative">
                {project?.name}
              </h1>
              <p className="text-[1rem] z-[1] relative">
                {project?.description}
              </p>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <div className="flex items-end gap-4 justify-between mb-5">
                <Statistic title="Total Reports" value={totalReports} />
                <Segmented
                  options={roleList}
                  value={role}
                  onChange={(value) => {
                    setrole(value, { history: "push" });
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <DatePicker
                  placeholder="From"
                  value={from ? dayjs(from) : undefined}
                  onChange={(date) =>
                    date ? setFrom(date.toISOString()) : setFrom(undefined)
                  }
                />
                ~
                <DatePicker
                  placeholder="To"
                  value={to ? dayjs(to) : undefined}
                  onChange={(date) =>
                    date ? setTo(date.toISOString()) : setTo(undefined)
                  }
                />
                <Select
                  className="w-[40%]"
                  placeholder="Select phase"
                  allowClear
                  options={
                    phases?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) ?? []
                  }
                  onChange={(value) => {
                    if (value) {
                      const phase = phases?.find((item) => item.id == value);
                      if (phase) {
                        setFrom(phase.from);
                        setTo(phase.to);
                      }
                    }
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
          <Col xs={24} md={6}>
            <Card title="Report Status Distribution" className="app-card">
              {reportStatusCount && <Pie data={statusPieData} />}
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card title="Report Type Distribution" className="app-card">
              {reportTypeCount && <Pie data={typePieData} />}
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card title="Reports Issue Type Distribution" className="app-card">
              {reportIssueTypeCount && <Pie data={issueTypePieData} />}
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card title="Report Severity Distribution" className="app-card">
              {reportSeverityCount && <Pie data={severityPieData} />}
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
          <Col xs={24} md={12}>
            <Card title="Report By Time" className="app-card">
              {reportsByTime && <Bar data={reportsByMonthBarData} />}
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Report By Member" className="app-card">
              {reportsByMember && <Bar data={reportsByMemberData} />}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardContainer;
