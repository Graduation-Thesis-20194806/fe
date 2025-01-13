/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { TaskFullEntity } from '../models/TaskFullEntity';
import type { TaskPaginationEntity } from '../models/TaskPaginationEntity';
import type { UpdateTaskDto } from '../models/UpdateTaskDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * @param projectid
     * @param role
     * @param page
     * @param pageSize
     * @param keyword
     * @param categoryId
     * @param statusId
     * @param phaseId
     * @returns TaskPaginationEntity
     * @throws ApiError
     */
    public static tasksControllerListTasks(
        projectid: string,
        role: string,
        page?: number,
        pageSize?: number,
        keyword?: string,
        categoryId?: number,
        statusId?: number,
        phaseId?: number,
    ): CancelablePromise<TaskPaginationEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/tasks/me',
            path: {
                'projectid': projectid,
            },
            query: {
                'page': page,
                'pageSize': pageSize,
                'role': role,
                'keyword': keyword,
                'categoryId': categoryId,
                'statusId': statusId,
                'phaseId': phaseId,
            },
        });
    }
    /**
     * @param projectid
     * @param requestBody
     * @returns TaskFullEntity
     * @throws ApiError
     */
    public static tasksControllerCreateTask(
        projectid: string,
        requestBody: CreateTaskDto,
    ): CancelablePromise<TaskFullEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/tasks/me',
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
     * @returns TaskFullEntity
     * @throws ApiError
     */
    public static tasksControllerUpdateTask(
        projectid: string,
        id: string,
        requestBody: UpdateTaskDto,
    ): CancelablePromise<TaskFullEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectid}/tasks/me/{id}',
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
     * @returns TaskFullEntity
     * @throws ApiError
     */
    public static tasksControllerGetMyTask(
        id: string,
    ): CancelablePromise<TaskFullEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/tasks/me/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static tasksControllerDeleteReport(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectid}/tasks/me/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Create Github Issue
     * @param projectid
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static tasksControllerCreateGithubIssue(
        projectid: string,
        requestBody: CreateTaskDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/tasks/github/sync',
            path: {
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
