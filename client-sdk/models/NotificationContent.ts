/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotiFieldInformation } from './NotiFieldInformation';
export type NotificationContent = {
    subject: NotiFieldInformation;
    action: NotificationContent.action;
    objectEntity: NotificationContent.objectEntity;
    object: NotiFieldInformation;
    objectAttribute?: string;
    objectAttributeValue?: NotiFieldInformation;
};
export namespace NotificationContent {
    export enum action {
        CREATE = 'CREATE',
        UPDATE = 'UPDATE',
        DELETE = 'DELETE',
    }
    export enum objectEntity {
        REPORT = 'REPORT',
        TASK = 'TASK',
    }
}

