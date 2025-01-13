/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationContent } from './NotificationContent';
export type NotificationEntity = {
    id: number;
    content: NotificationContent;
    createdAt: string;
    projectId: number;
    userId: number;
    isSeen: boolean;
    ProjectMember: Record<string, any>;
};

