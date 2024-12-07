import * as Yup from 'yup'

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Wrong email format')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'Please enter at least 8 characters')
    .required('This field is required'),
  repassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Password not match'
  ),
  username: Yup.string().required('this is required field'),
  fullname: Yup.string().required('this is required field'),
  phoneNumber: Yup.string()
  .matches(
    /^[0-9]{10}$/,
    "Phone number must be exactly 10 digits"
  )
  .required("Phone number is required")
})

export type RegisterData = Yup.InferType<typeof RegisterSchema>
