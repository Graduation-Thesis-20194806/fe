import { create } from "zustand";
import { UserStore, createUserStore } from "./user";
import { createProjectStore, ProjectStore } from "./project";

export const useBoundStore = create<UserStore & ProjectStore>()((...a) => ({
  ...createUserStore(...a),
  ...createProjectStore(...a),
}));
