/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReportDuplicateEntity = {
    id: number;
    name: string;
    level: ReportDuplicateEntity.level;
};
export namespace ReportDuplicateEntity {
    export enum level {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
    }
}

