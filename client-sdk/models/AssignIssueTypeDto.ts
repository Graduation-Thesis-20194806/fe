/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AssignIssueTypeDto = {
    userId: number;
    issueType: AssignIssueTypeDto.issueType;
};
export namespace AssignIssueTypeDto {
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

