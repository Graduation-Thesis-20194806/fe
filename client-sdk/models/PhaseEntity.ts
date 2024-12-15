/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PhaseEntity = {
    /**
     * Unique identifier of the Phase
     */
    id: number;
    /**
     * Name of the Phase
     */
    name: string;
    /**
     * Description of the Phase
     */
    description: string | null;
    /**
     * Start datetime of the Phase
     */
    from: string;
    /**
     * End datetime of the Phase
     */
    to: string;
    /**
     * Associated Project ID
     */
    projectId: number;
};

