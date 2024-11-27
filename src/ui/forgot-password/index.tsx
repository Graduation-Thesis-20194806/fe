'use client'
import AppButton from '@/common/components/AppButton'
import AppInput from '@/common/components/AppInput'
import { EMAIL_REGEX } from '@/common/constants'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { UsersService } from '../../../client-sdk'
import { message } from 'antd'
import { Error } from '@/common/types'
import TitleWrapper from '@/common/components/TitleWrapper'

type FormValue = {
  email: string
}

export default function ForgotPasswordComponent() {
  const router = useRouter()
  const locale = useLocale()
  const commonT = useTranslations('common')
  const t = useTranslations('ForgotPasswordComponent')
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: { email: '' },
  })
  const [isSendedEmail, setIsSendedEmail] = useState(false)

  const emailLabel = t('input.email.label')

  const moveToLogin = useCallback(() => {
    router.push(`/${locale}/login`)
  }, [router, locale])

  const handleForgotPassword = useCallback(
    async ({ email }: FormValue) => {
      try {
        const res = await UsersService.forgotPasswordApiUsersForgotPasswordPost(
          {
            email,
            locale,
          }
        )
        if (!res) {
          message.error(t('user_not_found'))
          return
        }
        setIsSendedEmail(true)
      } catch (error) {
        message.error((error as Error).body.detail)
      }
    },
    [locale, t]
  )

  return isSendedEmail ? (
    <div>
      <div className="font-normal text-xs leading-6 text-[#40509E] mb-6">
        {Array.from(Array(3).keys()).map((number) => (
          <p key={number}>
            {t(`sended_email.${number}`, { email: getValues('email') })}
          </p>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <AppButton
          text={t('back_to_login')}
          type="link"
          onClick={moveToLogin}
        />
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <div className="text-[10px] leading-[18px] text-[#40509E] font-normal mb-4">
        {Array.from(Array(2).keys()).map((number) => (
          <p key={number}>{t(`description.${number}`)}</p>
        ))}
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
          <TitleWrapper
            label={emailLabel}
            error={errors.email?.message}
            className="mb-4"
          >
            <AppInput
              placeholder={t('input.email.placeholder')}
              error={errors.email?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <AppButton text={commonT('send')} className="mb-4" htmlType="submit" />
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
