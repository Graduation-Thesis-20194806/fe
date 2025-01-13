/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationPaginateEntity } from '../models/NotificationPaginateEntity';
import type { UpdateNotificationDto } from '../models/UpdateNotificationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
    /**
     * Retrieve a list of notifications (filter by projectId & paginate)
     * @param page
     * @param pageSize
     * @param projectId Filter notifications by projectId
     * @param isSeen
     * @returns NotificationPaginateEntity
     * @throws ApiError
     */
    public static notificationsControllerFindAll(
        page?: number,
        pageSize?: number,
        projectId?: number,
        isSeen?: boolean,
    ): CancelablePromise<NotificationPaginateEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notifications',
            query: {
                'page': page,
                'pageSize': pageSize,
                'projectId': projectId,
                'isSeen': isSeen,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static notificationsControllerUpdateNotification(
        id: string,
        requestBody: UpdateNotificationDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/notifications/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
