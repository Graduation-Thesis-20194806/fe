/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileEntity } from './FileEntity';
import type { ProjectMemberEntity } from './ProjectMemberEntity';
import type { TaskCommentsEntity } from './TaskCommentsEntity';
export type TaskFullEntity = {
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
    TaskAttachment: Array<FileEntity>;
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

