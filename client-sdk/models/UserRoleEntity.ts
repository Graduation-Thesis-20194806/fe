/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserRoleEntity = {
    name: string;
    category: UserRoleEntity.category;
};
export namespace UserRoleEntity {
    export enum category {
        MEMBER = 'MEMBER',
        GUEST = 'GUEST',
        OWNER = 'OWNER',
    }
}

