"use client";

import ReportForm from "@/ui/reports/form";
import { useParams } from "next/navigation";

const CreateTasksPage = () => {
  const { reportid } = useParams();
  return (
    <>
      <ReportForm reportid={reportid.toString()} />
    </>
  );
};

export default CreateTasksPage;
