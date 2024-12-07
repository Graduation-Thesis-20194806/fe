import * as Yup from 'yup'

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Please enter at least 8 characters')
    .required('This is required fields'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Password not match'
  ),
  token: Yup.string().required()
})

export type ResetPasswordData = Yup.InferType<typeof ResetPasswordSchema>
