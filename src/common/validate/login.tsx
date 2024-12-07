import * as Yup from 'yup'

export const LoginSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Wrong email format'
    )
    .required('This is required field'),
  password: Yup.string().required('This is required field'),
})

export type LoginData = Yup.InferType<typeof LoginSchema>
