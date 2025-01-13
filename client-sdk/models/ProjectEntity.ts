/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GithubRepoEntity } from './GithubRepoEntity';
import type { UserRoleEntity } from './UserRoleEntity';
export type ProjectEntity = {
    id: number;
    name: string;
    projectThumbnail: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    userRole?: UserRoleEntity;
    githubOrgName?: string;
    GithubRepo?: Array<GithubRepoEntity>;
};

