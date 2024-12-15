/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateAssignDto = {
    issueType: UpdateAssignDto.issueType;
    userId: number;
};
export namespace UpdateAssignDto {
    export enum issueType {
        UI = 'UI',
        FUNCTIONAL = 'FUNCTIONAL',
        PERFORMANCE = 'PERFORMANCE',
        SECURITY = 'SECURITY',
        NETWORK = 'NETWORK',
        DATA = 'DATA',
        OTHER = 'OTHER',
    }
}

