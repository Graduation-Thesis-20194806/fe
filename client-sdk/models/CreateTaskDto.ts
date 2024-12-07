/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTaskDto = {
    name: string;
    description: string;
    estimateTime?: number;
    deadline?: string;
    priority?: CreateTaskDto.priority;
    isPublic?: boolean;
    statusId?: number;
    categoryId?: number;
    references?: Array<string>;
    assignedTo?: number;
    tags?: Array<number>;
    attachments?: Array<any[]>;
};
export namespace CreateTaskDto {
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        IMMEDIATE = 'IMMEDIATE',
    }
}

