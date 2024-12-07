/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCommentDto } from '../models/CreateCommentDto';
import type { GeneralResult } from '../models/GeneralResult';
import type { ReportCommentPaginateEntity } from '../models/ReportCommentPaginateEntity';
import type { ReportCommentsEntity } from '../models/ReportCommentsEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportCommentsService {
    /**
     * @param reportid
     * @param page
     * @param pageSize
     * @returns ReportCommentPaginateEntity
     * @throws ApiError
     */
    public static reportCommentsControllerListComments(
        reportid: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<ReportCommentPaginateEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/reports/{reportid}/report-comments/me',
            path: {
                'reportid': reportid,
            },
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @param reportid
     * @param requestBody
     * @returns ReportCommentsEntity
     * @throws ApiError
     */
    public static reportCommentsControllerCreateComment(
        reportid: string,
        requestBody: CreateCommentDto,
    ): CancelablePromise<ReportCommentsEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/reports/{reportid}/report-comments/me',
            path: {
                'reportid': reportid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param reportid
     * @param requestBody
     * @returns ReportCommentsEntity
     * @throws ApiError
     */
    public static reportCommentsControllerUpdateComment(
        id: string,
        reportid: string,
        requestBody: CreateCommentDto,
    ): CancelablePromise<ReportCommentsEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectid}/reports/{reportid}/report-comments/me/{id}',
            path: {
                'id': id,
                'reportid': reportid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param reportid
     * @returns GeneralResult
     * @throws ApiError
     */
    public static reportCommentsControllerDeleteComment(
        id: string,
        reportid: string,
    ): CancelablePromise<GeneralResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectid}/reports/{reportid}/report-comments/me/{id}',
            path: {
                'id': id,
                'reportid': reportid,
            },
        });
    }
}
