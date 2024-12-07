/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectMemberEntity } from './ProjectMemberEntity';
export type TaskCommentsEntity = {
    projectMember: ProjectMemberEntity;
    id: number;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    taskId: number;
};

