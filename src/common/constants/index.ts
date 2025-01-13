import { ReportListItemEntity } from "../../../client-sdk";

export const EMAIL_REGEX = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/;
export const TEL_REGEX =
  /^(?:\d{11}|(?:[０-９0-9]{3})[—－-\s](?:[０-９0-9]{4})[—－-\s](?:[０-９0-9]{4}))$/;

export const MONTH_FORMAT = "YYYY年MM月";
export const DATE_FORMAT = "YYYY年MM月DD日";

export const REPORT_ISSUE_COLOR_MAP = {
  [ReportListItemEntity.issueType.UI]: "red",
  [ReportListItemEntity.issueType.FUNCTIONAL]: "orange",
  [ReportListItemEntity.issueType.NETWORK]: "gold",
  [ReportListItemEntity.issueType.PERFORMANCE]: "green",
  [ReportListItemEntity.issueType.SECURITY]: "blue",
  [ReportListItemEntity.issueType.DATA]: "purple",
  [ReportListItemEntity.issueType.OTHER]: "default",
};

export const REPORT_STATUS_COLOR_MAP = {
  [ReportListItemEntity.status.INIT]: "blue",
  [ReportListItemEntity.status.CONFIRMING]: "purple",
  [ReportListItemEntity.status.IN_PROCESSING]: "gold",
  [ReportListItemEntity.status.REJECTED]: "red",
  [ReportListItemEntity.status.DONE]: "green",
  [ReportListItemEntity.status.CONFIRMED]: "orange",
  [ReportListItemEntity.status.REOPEN]: "blue",
};

export const REPORT_TYPE_COLOR_MAP = {
  [ReportListItemEntity.type.BUG]: "red",
  [ReportListItemEntity.type.FEEDBACK]: "gold",
  [ReportListItemEntity.type.WISH]: "blue",
};
