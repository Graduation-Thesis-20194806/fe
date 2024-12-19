/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignIssueTypeDto } from '../models/AssignIssueTypeDto';
import type { CategoryEntity } from '../models/CategoryEntity';
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { CreatePhaseDto } from '../models/CreatePhaseDto';
import type { CreateProjectDomainDto } from '../models/CreateProjectDomainDto';
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { CreateProjectStatusDto } from '../models/CreateProjectStatusDto';
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { GeneralResult } from '../models/GeneralResult';
import type { MemberPaginateEntity } from '../models/MemberPaginateEntity';
import type { PhaseEntity } from '../models/PhaseEntity';
import type { ProjectDomainEntity } from '../models/ProjectDomainEntity';
import type { ProjectEntity } from '../models/ProjectEntity';
import type { ProjectPaginateEntity } from '../models/ProjectPaginateEntity';
import type { RoleEntity } from '../models/RoleEntity';
import type { StatusEntity } from '../models/StatusEntity';
import type { UpdateAssignDto } from '../models/UpdateAssignDto';
import type { UpdateCategoryDto } from '../models/UpdateCategoryDto';
import type { UpdatePhaseDto } from '../models/UpdatePhaseDto';
import type { UpdateProjectDomainDto } from '../models/UpdateProjectDomainDto';
import type { UpdateProjectDto } from '../models/UpdateProjectDto';
import type { UpdateStatusDto } from '../models/UpdateStatusDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectsService {
    /**
     * @param page
     * @param pageSize
     * @param keyword
     * @returns ProjectPaginateEntity
     * @throws ApiError
     */
    public static projectsControllerListProjects(
        page?: number,
        pageSize?: number,
        keyword?: string,
    ): CancelablePromise<ProjectPaginateEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/me',
            query: {
                'page': page,
                'pageSize': pageSize,
                'keyword': keyword,
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
     * Update an existing project
     * @param id
     * @param requestBody
     * @returns ProjectEntity Project updated successfully.
     * @throws ApiError
     */
    public static projectsControllerUpdateProject(
        id: string,
        requestBody: UpdateProjectDto,
    ): CancelablePromise<ProjectEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/me/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Project not found.`,
            },
        });
    }
    /**
     * Delete a project
     * @param id
     * @returns any Project deleted successfully.
     * @throws ApiError
     */
    public static projectsControllerDeleteProject(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/me/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Project not found.`,
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
    /**
     * Create a new status
     * @param projectid
     * @param requestBody
     * @returns StatusEntity The status has been successfully created.
     * @throws ApiError
     */
    public static projectsControllerCreateStatus(
        projectid: string,
        requestBody: CreateProjectStatusDto,
    ): CancelablePromise<StatusEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/status',
            path: {
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data.`,
            },
        });
    }
    /**
     * Get all statuses
     * @param projectid
     * @returns StatusEntity List of statuses retrieved successfully.
     * @throws ApiError
     */
    public static projectsControllerFindAllStatus(
        projectid: string,
    ): CancelablePromise<Array<StatusEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/status',
            path: {
                'projectid': projectid,
            },
        });
    }
    /**
     * Get a single status by ID
     * @param id
     * @param projectid
     * @returns StatusEntity Status retrieved successfully.
     * @throws ApiError
     */
    public static projectsControllerFindOneStatus(
        id: number,
        projectid: string,
    ): CancelablePromise<StatusEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/status/{id}',
            path: {
                'id': id,
                'projectid': projectid,
            },
            errors: {
                404: `Status not found.`,
            },
        });
    }
    /**
     * Update an existing status by ID
     * @param id
     * @param projectid
     * @param requestBody
     * @returns StatusEntity The status has been successfully updated.
     * @throws ApiError
     */
    public static projectsControllerUpdateStatus(
        id: number,
        projectid: string,
        requestBody: UpdateStatusDto,
    ): CancelablePromise<StatusEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectid}/status/{id}',
            path: {
                'id': id,
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Status not found.`,
            },
        });
    }
    /**
     * Delete a status by ID
     * @param id
     * @param projectid
     * @returns StatusEntity The status has been successfully deleted.
     * @throws ApiError
     */
    public static projectsControllerRemoveStatus(
        id: number,
        projectid: string,
    ): CancelablePromise<StatusEntity> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectid}/status/{id}',
            path: {
                'id': id,
                'projectid': projectid,
            },
            errors: {
                404: `Status not found.`,
            },
        });
    }
    /**
     * Create a new category
     * @param projectid
     * @param requestBody
     * @returns CategoryEntity The category has been successfully created.
     * @throws ApiError
     */
    public static projectsControllerCreateCategory(
        projectid: string,
        requestBody: CreateCategoryDto,
    ): CancelablePromise<CategoryEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/category',
            path: {
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data.`,
            },
        });
    }
    /**
     * Get all categories
     * @param projectid
     * @returns CategoryEntity List of categories retrieved successfully.
     * @throws ApiError
     */
    public static projectsControllerFindAllCategory(
        projectid: string,
    ): CancelablePromise<Array<CategoryEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/category',
            path: {
                'projectid': projectid,
            },
        });
    }
    /**
     * Get a single category by ID
     * @param id
     * @param projectid
     * @returns CategoryEntity Category retrieved successfully.
     * @throws ApiError
     */
    public static projectsControllerFindOneCategory(
        id: number,
        projectid: string,
    ): CancelablePromise<CategoryEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/category/{id}',
            path: {
                'id': id,
                'projectid': projectid,
            },
            errors: {
                404: `Category not found.`,
            },
        });
    }
    /**
     * Update an existing category by ID
     * @param id
     * @param projectid
     * @param requestBody
     * @returns CategoryEntity The category has been successfully updated.
     * @throws ApiError
     */
    public static projectsControllerUpdateCategory(
        id: number,
        projectid: string,
        requestBody: UpdateCategoryDto,
    ): CancelablePromise<CategoryEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectid}/category/{id}',
            path: {
                'id': id,
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Category not found.`,
            },
        });
    }
    /**
     * Delete a category by ID
     * @param id
     * @param projectid
     * @returns CategoryEntity The category has been successfully deleted.
     * @throws ApiError
     */
    public static projectsControllerRemoveCategory(
        id: number,
        projectid: string,
    ): CancelablePromise<CategoryEntity> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectid}/category/{id}',
            path: {
                'id': id,
                'projectid': projectid,
            },
            errors: {
                404: `Category not found.`,
            },
        });
    }
    /**
     * Create a new Phase
     * @param projectid Project ID
     * @param requestBody
     * @returns PhaseEntity Phase created successfully.
     * @throws ApiError
     */
    public static projectsControllerCreatePhase(
        projectid: number,
        requestBody: CreatePhaseDto,
    ): CancelablePromise<PhaseEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectid}/phases',
            path: {
                'projectid': projectid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all Phases for a Project
     * @param projectid Project ID
     * @returns PhaseEntity List of phases returned successfully.
     * @throws ApiError
     */
    public static projectsControllerFindAllPhases(
        projectid: number,
    ): CancelablePromise<Array<PhaseEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/phases',
            path: {
                'projectid': projectid,
            },
        });
    }
    /**
     * Get a single Phase by ID
     * @param projectid Project ID
     * @param id Phase ID
     * @returns PhaseEntity Phase returned successfully.
     * @throws ApiError
     */
    public static projectsControllerFindOnePhase(
        projectid: number,
        id: number,
    ): CancelablePromise<PhaseEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectid}/phases/{id}',
            path: {
                'projectid': projectid,
                'id': id,
            },
            errors: {
                404: `Phase not found.`,
            },
        });
    }
    /**
     * Update a Phase by ID
     * @param projectid Project ID
     * @param id Phase ID
     * @param requestBody
     * @returns PhaseEntity Phase updated successfully.
     * @throws ApiError
     */
    public static projectsControllerUpdatePhase(
        projectid: number,
        id: number,
        requestBody: UpdatePhaseDto,
    ): CancelablePromise<PhaseEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectid}/phases/{id}',
            path: {
                'projectid': projectid,
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Phase not found.`,
            },
        });
    }
    /**
     * Delete a Phase by ID
     * @param projectid Project ID
     * @param id Phase ID
     * @returns PhaseEntity Phase deleted successfully.
     * @throws ApiError
     */
    public static projectsControllerRemovePhase(
        projectid: number,
        id: number,
    ): CancelablePromise<PhaseEntity> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectid}/phases/{id}',
            path: {
                'projectid': projectid,
                'id': id,
            },
            errors: {
                404: `Phase not found.`,
            },
        });
    }
    /**
     * @param projectId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerAssignIssueType(
        projectId: number,
        requestBody: AssignIssueTypeDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectId}/assign-issue-type',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all assignments in a project
     * @param projectId
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerGetAssigns(
        projectId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectId}/assign-issue-type',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Get a specific assignment in a project
     * @param projectId
     * @param assignId
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerGetAssignById(
        projectId: number,
        assignId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectId}/assign-issue-type/{assignId}',
            path: {
                'projectId': projectId,
                'assignId': assignId,
            },
        });
    }
    /**
     * Update issueType for an assignment
     * @param projectId
     * @param assignId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerUpdateAssign(
        projectId: number,
        assignId: number,
        requestBody: UpdateAssignDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectId}/assign-issue-type/{assignId}',
            path: {
                'projectId': projectId,
                'assignId': assignId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete an assignment
     * @param projectId
     * @param assignId
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerRemoveAssign(
        projectId: number,
        assignId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectId}/assign-issue-type/{assignId}',
            path: {
                'projectId': projectId,
                'assignId': assignId,
            },
        });
    }
    /**
     * Create a new ProjectDomain
     * @param projectId
     * @param requestBody
     * @returns ProjectDomainEntity ProjectDomain created successfully.
     * @throws ApiError
     */
    public static projectsControllerCreateProjectDomain(
        projectId: string,
        requestBody: CreateProjectDomainDto,
    ): CancelablePromise<ProjectDomainEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectId}/domains',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all ProjectDomains
     * @param projectId
     * @returns ProjectDomainEntity List of ProjectDomains.
     * @throws ApiError
     */
    public static projectsControllerFindAllProjectDomains(
        projectId: string,
    ): CancelablePromise<Array<ProjectDomainEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectId}/domains',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Get a ProjectDomain by its ID
     * @param id
     * @param projectId
     * @returns ProjectDomainEntity ProjectDomain found.
     * @throws ApiError
     */
    public static projectsControllerFindOneProjectDomain(
        id: string,
        projectId: string,
    ): CancelablePromise<ProjectDomainEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectId}/domains/{id}',
            path: {
                'id': id,
                'projectId': projectId,
            },
            errors: {
                404: `ProjectDomain not found.`,
            },
        });
    }
    /**
     * Update a ProjectDomain
     * @param id
     * @param projectId
     * @param requestBody
     * @returns ProjectDomainEntity ProjectDomain updated successfully.
     * @throws ApiError
     */
    public static projectsControllerUpdateProjectDomain(
        id: string,
        projectId: string,
        requestBody: UpdateProjectDomainDto,
    ): CancelablePromise<ProjectDomainEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/projects/{projectId}/domains/{id}',
            path: {
                'id': id,
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `ProjectDomain not found.`,
            },
        });
    }
    /**
     * Delete a ProjectDomain
     * @param id
     * @param projectId
     * @returns any ProjectDomain deleted successfully.
     * @throws ApiError
     */
    public static projectsControllerDeleteProjectDomain(
        id: string,
        projectId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectId}/domains/{id}',
            path: {
                'id': id,
                'projectId': projectId,
            },
            errors: {
                404: `ProjectDomain not found.`,
            },
        });
    }
    /**
     * Get Project by Url
     * @param domain
     * @returns ProjectEntity
     * @throws ApiError
     */
    public static projectsControllerGetProjectByUrl(
        domain: string,
    ): CancelablePromise<ProjectEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/me/by-domain',
            query: {
                'domain': domain,
            },
        });
    }
}
