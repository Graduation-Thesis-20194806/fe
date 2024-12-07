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
     * @returns TaskPaginationEntity
     * @throws ApiError
     */
    public static tasksControllerListTasks(
        projectid: string,
        role: string,
        page?: number,
        pageSize?: number,
        keyword?: string,
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
            },
        });
    }
    /**
     * @param requestBody
     * @returns TaskFullEntity
     * @throws ApiError
     */
    public static tasksControllerCreateTask(
        requestBody: CreateTaskDto,
    ): CancelablePromise<TaskFullEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/tasks/me',
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
}
