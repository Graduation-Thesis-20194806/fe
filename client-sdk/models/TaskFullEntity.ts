/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectMemberEntity } from './ProjectMemberEntity';
import type { TaskAttachmentEntity } from './TaskAttachmentEntity';
import type { TaskCommentsEntity } from './TaskCommentsEntity';
export type TaskFullEntity = {
    id: number;
    name: string;
    description: string;
    estimateTime?: number;
    deadline?: string;
    priority?: TaskFullEntity.priority;
    isPublic?: boolean;
    statusId?: number;
    categoryId?: number;
    references?: Array<string>;
    assignedTo?: number;
    Assignee?: ProjectMemberEntity;
    ProjectMember: ProjectMemberEntity;
    tags?: Array<number>;
    Report: Record<string, any>;
    reportId: number;
    phaseId?: number;
    TaskAttachment: Array<TaskAttachmentEntity>;
    TaskComment: Array<TaskCommentsEntity>;
};
export namespace TaskFullEntity {
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        IMMEDIATE = 'IMMEDIATE',
    }
}

