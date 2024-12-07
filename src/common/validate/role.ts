import * as Yup from "yup";
export const CreateRoleSchema = Yup.object({
  name: Yup.string().required("This is required field"),
  category: Yup.string().required("This is required field"),
});

export type RoleData = Yup.InferType<typeof CreateRoleSchema>