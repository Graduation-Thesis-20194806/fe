/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { LoginDto } from '../models/LoginDto';
import type { LoginEntity } from '../models/LoginEntity';
import type { LoginReturnEntity } from '../models/LoginReturnEntity';
import type { RefreshTokenDto } from '../models/RefreshTokenDto';
import type { UserEntity } from '../models/UserEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns LoginReturnEntity
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginDto,
    ): CancelablePromise<LoginReturnEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns UserEntity
     * @throws ApiError
     */
    public static authControllerRegister(
        requestBody: CreateUserDto,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns LoginEntity
     * @throws ApiError
     */
    public static authControllerRefreshToken(
        requestBody: RefreshTokenDto,
    ): CancelablePromise<LoginEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `token is not valid`,
                500: `generate token exception`,
            },
        });
    }
    /**
     * @returns string
     * @throws ApiError
     */
    public static authControllerGithubLogin(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/github/login',
        });
    }
    /**
     * @param code
     * @returns any
     * @throws ApiError
     */
    public static authControllerGithubCallback(
        code: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/github/callback',
            query: {
                'code': code,
            },
        });
    }
}
