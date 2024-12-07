import { ReportListItemEntity } from "../../../../client-sdk";

export const severityList = [
  {
    label: "Info",
    value: ReportListItemEntity.severity.INFO,
  },
  {
    label: "Low",
    value: ReportListItemEntity.severity.LOW,
  },
  {
    label: "Medium",
    value: ReportListItemEntity.severity.MEDIUM,
  },
  {
    label: "High",
    value: ReportListItemEntity.severity.HIGH,
  },
];
export const issueTypeList = [
  { label: "UI", value: ReportListItemEntity.issueType.UI },
  {
    label: "Functional",
    value: ReportListItemEntity.issueType.FUNCTIONAL,
  },
  {
    label: "Performance",
    value: ReportListItemEntity.issueType.PERFORMANCE,
  },
  {
    label: "Security",
    value: ReportListItemEntity.issueType.SECURITY,
  },
  {
    label: "Network",
    value: ReportListItemEntity.issueType.NETWORK,
  },
  {
    label: "Data",
    value: ReportListItemEntity.issueType.DATA,
  },
  {
    label: "Other",
    value: ReportListItemEntity.issueType.OTHER,
  },
  { label: "Unknown", value: undefined },
];

export const statusList = [
  { label: "Init", value: ReportListItemEntity.status.INIT },
  { label: "Confirming", value: ReportListItemEntity.status.CONFIRMING },
  { label: "In processing", value: ReportListItemEntity.status.IN_PROCESSING },
  { label: "Rejected", value: ReportListItemEntity.status.REJECTED },
  { label: "Done", value: ReportListItemEntity.status.DONE },
];
