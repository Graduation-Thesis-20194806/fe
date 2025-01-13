/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhookService {
    /**
     * @param xHubSignature256
     * @returns any
     * @throws ApiError
     */
    public static webhookControllerHandleGithubWebhook(
        xHubSignature256: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/webhook/github',
            headers: {
                'x-hub-signature-256': xHubSignature256,
            },
        });
    }
}
