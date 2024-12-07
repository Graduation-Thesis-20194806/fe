import * as Yup from 'yup'

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, 'Please enter at least 8 characters')
    .required('This is required field'),
  newPassword: Yup.string()
    .min(8, 'Please enter at least 8 characters')
    .required('This is required field'),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    'New password not match'
  ),
})

export type ChangePasswordData = Yup.InferType<typeof ChangePasswordSchema>
