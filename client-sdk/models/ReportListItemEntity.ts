/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCompactEntity } from './UserCompactEntity';
export type ReportListItemEntity = {
    id: number;
    name: string;
    type: ReportListItemEntity.type;
    description: string;
    stepsToReproduce?: string;
    expectedBehavior?: string;
    actualResult?: string;
    issueType?: ReportListItemEntity.issueType;
    severity?: ReportListItemEntity.severity;
    assignedTo?: number;
    createdById: number;
    projectId: number;
    status: ReportListItemEntity.status;
    url: string;
    createdAt: string;
    updatedAt: string;
    assignee?: UserCompactEntity;
    createdBy: UserCompactEntity;
    phaseId?: number;
    isProcessing?: boolean;
    isClosable: boolean;
};
export namespace ReportListItemEntity {
    export enum type {
        BUG = 'BUG',
        FEEDBACK = 'FEEDBACK',
        WISH = 'WISH',
    }
    export enum issueType {
        UI = 'UI',
        FUNCTIONAL = 'FUNCTIONAL',
        PERFORMANCE = 'PERFORMANCE',
        SECURITY = 'SECURITY',
        NETWORK = 'NETWORK',
        DATA = 'DATA',
        OTHER = 'OTHER',
    }
    export enum severity {
        INFO = 'INFO',
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
    }
    export enum status {
        INIT = 'INIT',
        CONFIRMING = 'CONFIRMING',
        CONFIRMED = 'CONFIRMED',
        IN_PROCESSING = 'IN_PROCESSING',
        REJECTED = 'REJECTED',
        DONE = 'DONE',
        REOPEN = 'REOPEN',
    }
}

