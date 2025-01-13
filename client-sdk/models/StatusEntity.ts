/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StatusEntity = {
    id: number;
    name: string;
    color: string;
    category?: StatusEntity.category;
};
export namespace StatusEntity {
    export enum category {
        OPEN = 'OPEN',
        CLOSE = 'CLOSE',
        REOPEN = 'REOPEN',
        CUSTOM = 'CUSTOM',
    }
}

