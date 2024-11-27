'use client'
import AppButton from '@/common/components/AppButton'
import AppInput from '@/common/components/AppInput'
import { EMAIL_REGEX } from '@/common/constants'
import { Segmented, message } from 'antd'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { UserType, UsersService } from '../../../client-sdk'
import { SegmentedValue } from 'antd/es/segmented'
import { Error } from '@/common/types'
import { useLocale, useTranslations } from 'next-intl'
import TitleWrapper from '@/common/components/TitleWrapper'
import { StorageType, setStorage } from '@/common/helpers/storage'

type FormValue = {
  email: string
  password: string
  repassword: string
}

export default function RegisterComponent() {
  const router = useRouter()
  const locale = useLocale()
  const commonT = useTranslations('common')
  const t = useTranslations('RegisterComponent')
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      email: '',
      password: '',
      repassword: '',
    },
  })
  const [type, setType] = useState<UserType>(UserType.PROJECT_OWNER)

  const emailLabel = t('input.email.label')
  const passwordLabel = t('input.password.label')
  const repasswordLabel = t('input.repassword.label')
  const passwordLength = { min: 8, max: 64 }
  const optionLabels = useMemo(
    () => ({
      [t(UserType.PROJECT_OWNER)]: UserType.PROJECT_OWNER,
      [t(UserType.FREELANCER)]: UserType.FREELANCER,
    }),
    [t]
  )
  const options = Object.keys(optionLabels)

  const handleRegister = useCallback(
    async ({ email, password }: FormValue) => {
      try {
        const res = await UsersService.registerUserApiUsersRegisterPost({
          email,
          password,
          type,
        })
        const storage: StorageType = 'session'
        setStorage('token', res.token, storage)
        setStorage('user', JSON.stringify(res.user), storage)
        message.success(t('register_success'))
        router.push(`/${locale}/dashboard`)
      } catch (error) {
        message.error((error as Error).body.detail)
      }
    },
    [type, t, locale, router]
  )

  const moveToLogin = useCallback(() => {
    router.push(`/${locale}/login`)
  }, [router, locale])

  const handleChangeType = useCallback(
    (value: SegmentedValue) => {
      setType(optionLabels[value])
    },
    [optionLabels]
  )

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="px-4 mb-4">
        <Segmented
          defaultValue={options[0]}
          onChange={handleChangeType}
          options={options}
          className="h-12 w-full shadow bg-white p-1 rounded-[10px]"
        />
      </div>
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
      <Controller
        control={control}
        name="repassword"
        rules={{
          required: commonT('rules.required', { field: repasswordLabel }),
          validate: {
            isValidRepassword: (value) => {
              if (value !== watch('password'))
                return commonT('rules.incorrect', { field: repasswordLabel })
            },
          },
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
      <AppButton text={t('register')} className="mb-4" htmlType="submit" />
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
