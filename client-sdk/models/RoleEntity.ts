/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RoleEntity = {
    id: number;
    category: RoleEntity.category;
    name: string;
    projectId: number;
};
export namespace RoleEntity {
    export enum category {
        MEMBER = 'MEMBER',
        GUEST = 'GUEST',
        OWNER = 'OWNER',
    }
}

