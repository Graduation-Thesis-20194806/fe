'use client'
import AppButton from '@/common/components/AppButton'
import AppInput from '@/common/components/AppInput'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { UsersService } from '../../../client-sdk'
import { message } from 'antd'
import { Error } from '@/common/types'
import TitleWrapper from '@/common/components/TitleWrapper'

type FormValue = {
  newPassword: string
  repassword: string
}

export default function ResetPasswordComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = useLocale()
  const commonT = useTranslations('common')
  const t = useTranslations('ResetPasswordComponent')
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      newPassword: '',
      repassword: '',
    },
  })

  const newPasswordLabel = t('input.new_password.label')
  const repasswordLabel = t('input.repassword.label')
  const passwordLength = { min: 8, max: 64 }

  const handleResetPassword = useCallback(
    async ({ newPassword, repassword }: FormValue) => {
      if (newPassword !== repassword) {
        return setError('repassword', {
          type: 'validate',
          message: commonT('rules.incorrect', { field: repasswordLabel }),
        })
      }
      try {
        const res = await UsersService.resetPasswordApiUsersResetPasswordPost({
          newPassword,
          email: searchParams.get('email')!,
          uuid: searchParams.get('uuid')!,
        })
        if (res.success) {
          message.success(t('reset_success'))
          router.push(`/${locale}/login`)
        } else {
          message.error(t('reset_failed'))
        }
      } catch (error) {
        message.error((error as Error).body.detail)
      }
    },
    [commonT, repasswordLabel, setError, searchParams, locale, router, t]
  )

  const moveToLogin = useCallback(() => {
    router.push(`/${locale}/login`)
  }, [router, locale])

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <Controller
        control={control}
        name="newPassword"
        rules={{
          required: commonT('rules.required', { field: newPasswordLabel }),
          minLength: {
            value: passwordLength.min,
            message: commonT('rules.minLength', {
              field: newPasswordLabel,
              value: passwordLength.min,
            }),
          },
          maxLength: {
            value: passwordLength.max,
            message: commonT('rules.maxLength', {
              field: newPasswordLabel,
              value: passwordLength.max,
            }),
          },
        }}
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={newPasswordLabel}
            error={errors.newPassword?.message}
          >
            <AppInput
              placeholder={t('input.new_password.placeholder')}
              type="password"
              error={errors.newPassword?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <Controller
        control={control}
        name="repassword"
        rules={{
          required: commonT('rules.required', { field: repasswordLabel }),
        }}
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={repasswordLabel}
            error={errors.repassword?.message}
            className="my-4"
          >
            <AppInput
              placeholder={t('input.repassword.placeholder')}
              type="password"
              error={errors.repassword?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <AppButton text={t('resetting')} className="mb-4" htmlType="submit" />
      <div className="flex justify-center items-center">
        <AppButton
          text={t('back_to_login')}
          type="link"
          onClick={moveToLogin}
        />
      </div>
    </form>
  )
}
