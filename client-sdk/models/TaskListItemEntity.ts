/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IssueGithubEntity } from './IssueGithubEntity';
import type { ProjectMemberEntity } from './ProjectMemberEntity';
export type TaskListItemEntity = {
    id: number;
    name: string;
    description: string;
    createdBy: number;
    estimateTime?: number;
    deadline?: string;
    priority?: TaskListItemEntity.priority;
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
    taskType?: TaskListItemEntity.taskType;
    IssueGithub?: IssueGithubEntity;
};
export namespace TaskListItemEntity {
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        IMMEDIATE = 'IMMEDIATE',
    }
    export enum taskType {
        GITHUB = 'GITHUB',
        DEFAULT = 'DEFAULT',
    }
}

