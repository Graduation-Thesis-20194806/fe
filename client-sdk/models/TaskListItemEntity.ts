/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectMemberEntity } from './ProjectMemberEntity';
export type TaskListItemEntity = {
    name: string;
    description: string;
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
};
export namespace TaskListItemEntity {
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        IMMEDIATE = 'IMMEDIATE',
    }
}

