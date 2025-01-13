/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoleEntity } from './RoleEntity';
export type UserEntity = {
    id: number;
    email: string;
    fullname: string;
    avatar?: string;
    address?: string;
    createdAt: string;
    updatedAt?: string;
    role?: RoleEntity;
    phoneNumber: string;
    username: string;
    githubId?: string;
    githubUsername?: string;
};

