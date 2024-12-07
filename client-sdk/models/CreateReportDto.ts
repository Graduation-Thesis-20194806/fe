/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReportImageDto } from './CreateReportImageDto';
export type CreateReportDto = {
    name: string;
    type?: string;
    severity: string;
    isPublic?: boolean;
    assignedTo?: number;
    description: string;
    stepsToReproduce: string;
    expectedBehavior: string;
    actualResult: string;
    issueType: string;
    additionInfo?: Record<string, any>;
    url: string;
    status?: string;
    images?: Array<CreateReportImageDto>;
    tags?: Array<string>;
};

