/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRoleEntity } from './UserRoleEntity';
export type ProjectEntity = {
    id: number;
    name: string;
    projectThumbnail: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    userRole?: UserRoleEntity;
};
