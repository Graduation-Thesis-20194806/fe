/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateTaskDto = {
    id?: string;
    name?: string;
    description?: string;
    estimateTime?: number;
    deadline?: string;
    priority?: UpdateTaskDto.priority;
    isPublic?: boolean;
    statusId?: number;
    categoryId?: number;
    references?: Array<string>;
    assignedTo?: number;
    tags?: Array<number>;
    newAttachments?: Array<any[]>;
    deleteAttachments?: Array<any[]>;
    attachments?: Array<number>;
    reportId?: number;
    phaseId?: number;
};
export namespace UpdateTaskDto {
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        IMMEDIATE = 'IMMEDIATE',
    }
}

