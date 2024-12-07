/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { GeneralResult } from '../models/GeneralResult';
import type { MemberPaginateEntity } from '../models/MemberPaginateEntity';
import type { ProjectEntity } from '../models/ProjectEntity';
import type { ProjectPaginateEntity } from '../models/ProjectPaginateEntity';
import type { RoleEntity } from '../models/RoleEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectsService {
    /**
     * @param page
     * @param pageSize
     * @returns ProjectPaginateEntity
     * @throws ApiError
     */
    public static projectsControllerListProjects(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<ProjectPaginateEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/me',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns ProjectEntity
     * @throws ApiError
     */
    public static projectsControllerCreateProject(
        requestBody: CreateProjectDto,
    ): CancelablePromise<ProjectEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ProjectEntity
     * @throws ApiError
     */
    public static projectsControllerGetProject(
        id: string,
    ): CancelablePromise<ProjectEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/me/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns RoleEntity
     * @throws ApiError
     */
    public static projectsControllerGetRoles(
        id: string,
    ): CancelablePromise<Array<RoleEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{id}/roles',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param projectid
     * @param requestBody
     * @returns ProjectEntity
     * @throws ApiError
     */
    public static projectsControllerCreateRole(
        projectid: string,
        requestBody: CreateRoleDto,
    ): CancelablePromise<ProjectEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/roles',
            path: {
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param projectid
     * @param roleid
     * @returns GeneralResult
     * @throws ApiError
     */
    public static projectsControllerDeleteRole(
        projectid: string,
        roleid: string,
    ): CancelablePromise<GeneralResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectid}/roles/{roleid}',
            path: {
                'projectid': projectid,
                'roleid': roleid,
            },
        });
    }
    /**
     * @param projectid
     * @returns MemberPaginateEntity
     * @throws ApiError
     */
    public static projectsControllerGetMembers(
        projectid: string,
    ): CancelablePromise<MemberPaginateEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/members',
            path: {
                'projectid': projectid,
            },
        });
    }
    /**
     * @param projectid
     * @param userid
     * @returns GeneralResult
     * @throws ApiError
     */
    public static projectsControllerDeleteMember(
        projectid: string,
        userid: string,
    ): CancelablePromise<GeneralResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectid}/members/{userid}',
            path: {
                'projectid': projectid,
                'userid': userid,
            },
        });
    }
    /**
     * @param projectid
     * @param email
     * @param roleid
     * @returns void
     * @throws ApiError
     */
    public static projectsControllerGetInvitationLink(
        projectid: string,
        email: string,
        roleid: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/invite',
            path: {
                'projectid': projectid,
            },
            query: {
                'email': email,
                'roleid': roleid,
            },
        });
    }
    /**
     * @param projectid
     * @param token
     * @returns GeneralResult
     * @throws ApiError
     */
    public static projectsControllerVerifyMember(
        projectid: string,
        token: string,
    ): CancelablePromise<GeneralResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/invite/verify',
            path: {
                'projectid': projectid,
            },
            query: {
                'token': token,
            },
        });
    }
}
