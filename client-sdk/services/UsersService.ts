/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UserEntity } from '../models/UserEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @returns UserEntity
     * @throws ApiError
     */
    public static usersControllerGetMe(): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }
    /**
     * @param requestBody
     * @returns UserEntity
     * @throws ApiError
     */
    public static usersControllerUpdateUser(
        requestBody: UpdateUserDto,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page
     * @param pageSize
     * @returns any
     * @throws ApiError
     */
    public static usersControllerGetGithubOrgs(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/github/org',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * Get All Github Repo
     * @param page
     * @param pageSize
     * @param org
     * @returns any
     * @throws ApiError
     */
    public static usersControllerGetGithubProjects(
        page?: number,
        pageSize?: number,
        org?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/github/repo',
            query: {
                'page': page,
                'pageSize': pageSize,
                'org': org,
            },
        });
    }
}
