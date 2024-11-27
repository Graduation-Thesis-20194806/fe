'use client'
import AppButton from '@/common/components/AppButton'
import AppInput from '@/common/components/AppInput'
import { EMAIL_REGEX } from '@/common/constants'
import { Checkbox, message } from 'antd'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { UsersService } from '../../../client-sdk'
import { useRouter } from 'next/navigation'
import { StorageType, setStorage } from '@/common/helpers/storage'
import { useLocale, useTranslations } from 'next-intl'
import TitleWrapper from '@/common/components/TitleWrapper'

type FormValue = {
  email: string
  password: string
  rememberLogin: boolean
}

export default function LoginComponent() {
  const router = useRouter()
  const locale = useLocale()
  const commonT = useTranslations('common')
  const t = useTranslations('LoginComponent')
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      email: '',
      password: '',
      rememberLogin: false,
    },
  })

  const emailLabel = t('input.email.label')
  const passwordLabel = t('input.password.label')
  const passwordLength = { min: 8, max: 64 }

  const handleLogin = useCallback(
    async ({ email, password, rememberLogin }: FormValue) => {
      try {
        const res = await UsersService.loginUserApiUsersLoginPost({
          email,
          password,
        })
        const storage: StorageType = rememberLogin ? 'local' : 'session'
        setStorage('token', res.token, storage)
        setStorage('user', JSON.stringify(res.user), storage)
        message.success(t('login_success'))
        router.push(`/${locale}/dashboard`)
      } catch (e) {
        message.error(t('incorrect_email_or_password'))
      }
    },
    [router, locale, t]
  )

  const moveToRegister = useCallback(() => {
    router.push(`/${locale}/register`)
  }, [router, locale])

  const moveToForgotPassword = useCallback(() => {
    router.push(`/${locale}/forgot-password`)
  }, [router, locale])

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Controller
        control={control}
        name="email"
        rules={{
          required: commonT('rules.required', { field: emailLabel }),
          pattern: {
            value: EMAIL_REGEX,
            message: commonT('rules.invalid', { field: emailLabel }),
          },
        }}
        render={({ field: { value, onChange } }) => (
          <TitleWrapper label={emailLabel} error={errors.email?.message}>
            <AppInput
              placeholder={t('input.email.placeholder')}
              error={errors.email?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: commonT('rules.required', { field: passwordLabel }),
          minLength: {
            value: passwordLength.min,
            message: commonT('rules.minLength', {
              field: passwordLabel,
              value: passwordLength.min,
            }),
          },
          maxLength: {
            value: passwordLength.max,
            message: commonT('rules.maxLength', {
              field: passwordLabel,
              value: passwordLength.max,
            }),
          },
        }}
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={passwordLabel}
            error={errors.password?.message}
            className="mt-4"
          >
            <AppInput
              placeholder={t('input.password.placeholder')}
              type="password"
              error={errors.password?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <div className="flex justify-between items-center mb-5">
        <Controller
          control={control}
          name="rememberLogin"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={onChange}
              className="font-medium text-sm text-[#183F6C]"
            >
              {t('remember_login')}
            </Checkbox>
          )}
        />
        <AppButton
          text={t('forgot_password')}
          type="link"
          onClick={moveToForgotPassword}
        />
      </div>
      <AppButton text={t('login')} className="mb-4" htmlType="submit" />
      <div className="flex justify-center items-center">
        <p className="text-center text-sm font-normal text-[#475467] mr-1">
          {t('no_account')}
        </p>
        <AppButton text={t('signup')} type="link" onClick={moveToRegister} />
      </div>
    </form>
  )
}
