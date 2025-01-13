/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReportCommentsEntity } from './ReportCommentsEntity';
import type { ReportCompactEntity } from './ReportCompactEntity';
import type { ReportDuplicateEntity } from './ReportDuplicateEntity';
import type { ReportImageEntity } from './ReportImageEntity';
import type { TaskCompactEntity } from './TaskCompactEntity';
import type { UserCompactEntity } from './UserCompactEntity';
export type ReportFullEntity = {
    id: number;
    name: string;
    type: ReportFullEntity.type;
    description: string;
    stepsToReproduce?: string;
    expectedBehavior?: string;
    actualResult?: string;
    issueType?: ReportFullEntity.issueType;
    severity?: ReportFullEntity.severity;
    assignedTo?: number;
    createdById: number;
    projectId: number;
    status: ReportFullEntity.status;
    url: string;
    createdAt: string;
    updatedAt: string;
    assignee?: UserCompactEntity;
    createdBy: UserCompactEntity;
    phaseId?: number;
    isProcessing?: boolean;
    isClosable: boolean;
    ReportImage: Array<ReportImageEntity>;
    ReportComment: Array<ReportCommentsEntity>;
    DuplicateGroup?: Array<ReportDuplicateEntity>;
    children?: Array<ReportCompactEntity>;
    Task?: Array<TaskCompactEntity>;
};
export namespace ReportFullEntity {
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

