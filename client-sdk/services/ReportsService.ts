/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReportDto } from '../models/CreateReportDto';
import type { MergeReportDto } from '../models/MergeReportDto';
import type { ReportFullEntity } from '../models/ReportFullEntity';
import type { ReportPaginationEntity } from '../models/ReportPaginationEntity';
import type { UpdateReportDto } from '../models/UpdateReportDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportsService {
    /**
     * @param projectid
     * @param role
     * @param page
     * @param pageSize
     * @param severity
     * @param issueType
     * @param status
     * @param keyword
     * @param phaseId
     * @returns ReportPaginationEntity
     * @throws ApiError
     */
    public static reportsControllerListReports(
        projectid: string,
        role: string,
        page?: number,
        pageSize?: number,
        severity?: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH',
        issueType?: 'UI' | 'FUNCTIONAL' | 'PERFORMANCE' | 'SECURITY' | 'NETWORK' | 'DATA' | 'OTHER',
        status?: 'INIT' | 'CONFIRMING' | 'IN_PROCESSING' | 'REJECTED' | 'DONE',
        keyword?: string,
        phaseId?: number,
    ): CancelablePromise<ReportPaginationEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/reports/me',
            path: {
                'projectid': projectid,
            },
            query: {
                'page': page,
                'pageSize': pageSize,
                'role': role,
                'severity': severity,
                'issueType': issueType,
                'status': status,
                'keyword': keyword,
                'phaseId': phaseId,
            },
        });
    }
    /**
     * @param projectid
     * @param requestBody
     * @returns ReportFullEntity
     * @throws ApiError
     */
    public static reportsControllerCreateReport(
        projectid: string,
        requestBody: CreateReportDto,
    ): CancelablePromise<ReportFullEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/reports/me',
            path: {
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param projectid
     * @param id
     * @param requestBody
     * @returns ReportFullEntity
     * @throws ApiError
     */
    public static reportsControllerUpdateReport(
        projectid: string,
        id: string,
        requestBody: UpdateReportDto,
    ): CancelablePromise<ReportFullEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectid}/reports/me/{id}',
            path: {
                'projectid': projectid,
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ReportFullEntity
     * @throws ApiError
     */
    public static reportsControllerGetMyReport(
        id: string,
    ): CancelablePromise<ReportFullEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/reports/me/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static reportsControllerMergeReport(
        id: string,
        requestBody: MergeReportDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/reports/me/{id}/merge',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
