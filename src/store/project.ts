import { StateCreator } from "zustand";
import { UserRoleEntity } from "../../client-sdk";

export interface ProjectStore {
  project_id?: number;
  setCurrent: (id?: number, role?: UserRoleEntity.category, name?: string) => void;
  user_role?: UserRoleEntity.category
  project_name?: string
}

export const createProjectStore: StateCreator<ProjectStore> = (set) => ({
  setCurrent: (id?: number, role?: UserRoleEntity.category, name?: string) =>
    set((state) => ({ ...state, project_id: id, user_role: role, project_name: name })),
});
