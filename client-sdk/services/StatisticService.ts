/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StatisticService {
    /**
     * Get count of reports by status
     * @param projectid
     * @param role
     * @param from Start date/time of the phase
     * @param to End date/time of the phase
     * @param dateType
     * @returns any Returns array of objects with {status, count}
     * @throws ApiError
     */
    public static statisticControllerGetReportStatusCount(
        projectid: string,
        role: string,
        from?: string,
        to?: string,
        dateType?: string,
    ): CancelablePromise<Array<{
        status?: 'INIT' | 'CONFIRMING' | 'IN_PROCESSING' | 'REJECTED' | 'DONE';
        count?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/statistic/report-status-count',
            path: {
                'projectid': projectid,
            },
            query: {
                'role': role,
                'from': from,
                'to': to,
                'dateType': dateType,
            },
        });
    }
    /**
     * Get count of reports by severity
     * @param projectid
     * @param role
     * @param from Start date/time of the phase
     * @param to End date/time of the phase
     * @param dateType
     * @returns any Returns array of objects with {severity, count}
     * @throws ApiError
     */
    public static statisticControllerGetReportSeverityCount(
        projectid: string,
        role: string,
        from?: string,
        to?: string,
        dateType?: string,
    ): CancelablePromise<Array<{
        severity?: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'null';
        count?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/statistic/report-severity-count',
            path: {
                'projectid': projectid,
            },
            query: {
                'role': role,
                'from': from,
                'to': to,
                'dateType': dateType,
            },
        });
    }
    /**
     * Get count of reports by type
     * @param projectid
     * @param role
     * @param from Start date/time of the phase
     * @param to End date/time of the phase
     * @param dateType
     * @returns any Returns array of objects with {type, count}
     * @throws ApiError
     */
    public static statisticControllerGetReportTypeCount(
        projectid: string,
        role: string,
        from?: string,
        to?: string,
        dateType?: string,
    ): CancelablePromise<Array<{
        type?: 'BUG' | 'FEEDBACK' | 'WISH';
        count?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/statistic/report-type-count',
            path: {
                'projectid': projectid,
            },
            query: {
                'role': role,
                'from': from,
                'to': to,
                'dateType': dateType,
            },
        });
    }
    /**
     * Get count of reports by type
     * @param projectid
     * @param role
     * @param from Start date/time of the phase
     * @param to End date/time of the phase
     * @param dateType
     * @returns any Returns array of objects with {type, count}
     * @throws ApiError
     */
    public static statisticControllerGetReportIssueTypeCount(
        projectid: string,
        role: string,
        from?: string,
        to?: string,
        dateType?: string,
    ): CancelablePromise<Array<{
        issueType?: 'UI' | 'FUNCTIONAL' | 'PERFORMANCE' | 'SECURITY' | 'NETWORK' | 'DATA' | 'OTHER';
        count?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/statistic/report-issue-type-count',
            path: {
                'projectid': projectid,
            },
            query: {
                'role': role,
                'from': from,
                'to': to,
                'dateType': dateType,
            },
        });
    }
    /**
     * Get the number of reports created each day/month/type over a given period
     * @param projectid
     * @param role
     * @param from Start date/time of the phase
     * @param to End date/time of the phase
     * @param dateType
     * @returns any Returns array of objects with {date, count}
     * @throws ApiError
     */
    public static statisticControllerGetReportStatisticByTime(
        projectid: string,
        role: string,
        from?: string,
        to?: string,
        dateType?: string,
    ): CancelablePromise<Array<{
        date?: string;
        count?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/statistic/reports-by-time',
            path: {
                'projectid': projectid,
            },
            query: {
                'role': role,
                'from': from,
                'to': to,
                'dateType': dateType,
            },
        });
    }
    /**
     * Get the number of reports owned/assigned by member over a given period
     * @param projectid
     * @param role
     * @param from Start date/time of the phase
     * @param to End date/time of the phase
     * @param dateType
     * @returns any Returns array of objects with {date, count}
     * @throws ApiError
     */
    public static statisticControllerGetReportStatisticByMember(
        projectid: string,
        role: string,
        from?: string,
        to?: string,
        dateType?: string,
    ): CancelablePromise<Array<{
        userId?: number;
        count?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/statistic/reports-by-member',
            path: {
                'projectid': projectid,
            },
            query: {
                'role': role,
                'from': from,
                'to': to,
                'dateType': dateType,
            },
        });
    }
}
