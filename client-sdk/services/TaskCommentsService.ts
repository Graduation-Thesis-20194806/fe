/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeneralResult } from '../models/GeneralResult';
import type { TaskCommentPaginateEntity } from '../models/TaskCommentPaginateEntity';
import type { TaskCommentsEntity } from '../models/TaskCommentsEntity';
import type { TaskCreateCommentDto } from '../models/TaskCreateCommentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TaskCommentsService {
    /**
     * @param taskid
     * @param page
     * @param pageSize
     * @returns TaskCommentPaginateEntity
     * @throws ApiError
     */
    public static commentsControllerListComments(
        taskid: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<TaskCommentPaginateEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/tasks/{taskid}/task-comments/me',
            path: {
                'taskid': taskid,
            },
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @param taskid
     * @param projectid
     * @param requestBody
     * @returns TaskCommentsEntity
     * @throws ApiError
     */
    public static commentsControllerCreateComment(
        taskid: string,
        projectid: string,
        requestBody: TaskCreateCommentDto,
    ): CancelablePromise<TaskCommentsEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/tasks/{taskid}/task-comments/me',
            path: {
                'taskid': taskid,
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param taskid
     * @param requestBody
     * @returns TaskCommentsEntity
     * @throws ApiError
     */
    public static commentsControllerUpdateComment(
        id: string,
        taskid: string,
        requestBody: TaskCreateCommentDto,
    ): CancelablePromise<TaskCommentsEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectid}/tasks/{taskid}/task-comments/me/{id}',
            path: {
                'id': id,
                'taskid': taskid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param taskid
     * @returns GeneralResult
     * @throws ApiError
     */
    public static commentsControllerDeleteComment(
        id: string,
        taskid: string,
    ): CancelablePromise<GeneralResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectid}/tasks/{taskid}/task-comments/me/{id}',
            path: {
                'id': id,
                'taskid': taskid,
            },
        });
    }
}
