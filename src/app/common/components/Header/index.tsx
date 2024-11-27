'use client'

import LogoutIcon from '@/common/assets/logout-icon'
import SidebarIcon from '@/common/assets/sidebar-icon'
import { getStorage, removeStorage } from '@/common/helpers/storage'
import { useBoundStore } from '@/store'
import { useQueryClient } from '@tanstack/react-query'
import { Avatar, Dropdown, MenuProps } from 'antd'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { UserType } from '../../../../client-sdk'
import HospitalIcon from '@/common/assets/hospital-icon'
import DoctorIcon from '@/common/assets/doctor-icon'

const Header = () => {
  const toggleShow = useBoundStore((state) => state.toggleShow)
  const { username, userColor } = useBoundStore()
  const t = useTranslations('Header')
  const queryClient = useQueryClient()
  const router = useRouter()
  const locale = useLocale()
  const user = getStorage('user', 'local') || getStorage('user', 'session')
  const userType = JSON.parse(user ?? '').type

  const headerTitles = {
    dashboard:
      userType === UserType.PROJECT_OWNER
        ? t('title.dashboard')
        : t('title.dashboard_freelancer'),
    matching: t('title.matching'),
    'chat-interviewer-ai': UserType.PROJECT_OWNER
      ? t('title.chat-interviewer-ai-project-owner')
      : t('title.chat-interviewer-ai-freelancer'),
    qa: t('title.qa'),
    'recent-chats': t('title.recent-chats'),
  }

  const handleLogout = useCallback(() => {
    removeStorage('token', 'local')
    removeStorage('token', 'session')
    removeStorage('user', 'local')
    removeStorage('user', 'session')
    queryClient.clear()
    router.push(`/${locale}/login`)
  }, [router, locale, queryClient])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: t('menu.logout'),
      icon: <LogoutIcon />,
      className: 'flex gap-3',
      onClick: handleLogout,
    },
  ]

  const pathname = usePathname().split('/').pop() as keyof typeof headerTitles

  return (
    <div className="flex justify-between items-center px-4 py-5 md:px-7 md:py-6 bg-[#1D2939] lg:bg-inherit">
      <span className="lg:hidden" onClick={toggleShow}>
        <SidebarIcon />
      </span>
      <Image
        src="/images/logo-white.png"
        alt="logo"
        width={138}
        height={36}
        priority
        className="lg:hidden"
      />
      <span className="font-medium text-[#183F6C] text-3xl hidden lg:block">
        {headerTitles[pathname]}
      </span>
      <div className="flex gap-2 items-center">
        {username && <span className="hidden lg:block">{username}</span>}
        <Dropdown
          menu={{
            items,
            selectable: true,
          }}
        >
          <Avatar
            size={36}
            icon={
              userType === UserType.FREELANCER ? (
                <HospitalIcon color={userColor} />
              ) : (
                <DoctorIcon color={userColor} />
              )
            }
            className="avatar-custom"
          />
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
