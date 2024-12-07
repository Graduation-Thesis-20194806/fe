/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PresignedUrlEntity } from '../models/PresignedUrlEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FilesService {
    /**
     * @param fileName
     * @returns PresignedUrlEntity
     * @throws ApiError
     */
    public static filesControllerGetPresignedUrl(
        fileName: string,
    ): CancelablePromise<PresignedUrlEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/files/presigned-url',
            query: {
                'fileName': fileName,
            },
        });
    }
}
