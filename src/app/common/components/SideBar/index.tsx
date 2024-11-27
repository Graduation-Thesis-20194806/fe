'use client'

import UserOctagonIcon from '@/common/assets/user-octagon-icon'
import MenuLink from './MenuLink'
import { MenuItem } from '@/common/types'
import Image from 'next/image'
import MatchingIcon from '@/common/assets/matching-icon'
import CloseIcon from '@/common/assets/close-icon'
import clsx from 'clsx'
import { useBoundStore } from '@/store'
import { useLocale, useTranslations } from 'next-intl'
import HelpIcon from '@/common/assets/help-icon'
import AppButton from '../AppButton'
import SyncOutlinedIcon from '@/common/assets/sync-outlined-icon'
import { getStorage } from '@/common/helpers/storage'
import {
  MatchingsService,
  UserBase,
  UserType,
  UsersService,
} from '../../../../client-sdk'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import useClickAway from '@/common/libs/useClickAway'
import getRandomColor from '@/common/libs/getRandomColor'
import { useRef } from 'react'

const Sidebar = () => {
  const ref = useRef(null)
  const show = useBoundStore((state) => state.show)
  const toggleShow = useBoundStore((state) => state.toggleShow)
  const user = getStorage('user', 'local') || getStorage('user', 'session')
  const { setUsername, setUserColor } = useBoundStore()
  const userType = JSON.parse(user ?? '').type
  const locale = useLocale()
  const queryClient = useQueryClient()
  const t = useTranslations('Sidebar')

  const menuItems: MenuItem[] = [
    {
      title: t('title.dashboard'),
      path: `/${locale}/dashboard`,
      icon: <UserOctagonIcon />,
    },
    {
      title: t('title.matching'),
      path: `/${locale}/dashboard/matching`,
      icon: <MatchingIcon />,
    },
    {
      title: t('title.recent-chats'),
      path: `/${locale}/dashboard/recent-chats`,
      icon: <HelpIcon />,
    },
  ]

  const { data: getMe } = useQuery({
    queryKey: ['get-me'],
    queryFn: async () => {
      const res = await UsersService.getMeApiUsersMeGet()
      setUsername(res.username || '')
      setUserColor(res.userColor || getRandomColor() || '')
      if (userType === UserType.PROJECT_OWNER) {
        queryClient.refetchQueries({
          queryKey: ['list-matching-project-owner'],
        })
      } else {
        queryClient.refetchQueries({
          queryKey: ['list-matching-freelancer'],
        })
      }

      return res
    },
    refetchInterval: 5 * 60 * 1000,
  })

  const handleMatching = async () => {
    try {
      if (userType === UserType.PROJECT_OWNER) {
        await MatchingsService.matchingProjectOwnerApiMatchingsProjectOwnerGet()
      } else {
        await MatchingsService.matchingFreelancerApiMatchingsFreelancerGet()
      }
      queryClient.setQueryData(['get-me'], (oldData: UserBase) => {
        return { ...oldData, matchingCount: 1, matchingAt: new Date() }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseSideBar = () => {
    if (show) {
      toggleShow()
    }
  }

  useClickAway<MouseEvent>(ref, () => {
    handleCloseSideBar()
  })

  return (
    <div
      ref={ref}
      className={clsx(
        'w-60 h-screen flex flex-col justify-between bg-[#1D2939] py-6 z-50 fixed',
        {
          'hidden lg:flex': !show,
        }
      )}
    >
      <div>
        <div className="mx-4 lg:mx-7 flex justify-between items-center">
          <Image
            src="/images/logo-white.png"
            alt="logo"
            width={118}
            height={26}
            priority
          />
          <span className="lg:hidden" onClick={toggleShow}>
            <CloseIcon />
          </span>
        </div>
        <ul className="mt-7 text-[#98A2B3] font-normal mr-5">
          {menuItems.map((item) => (
            <li key={item.title} onClick={handleCloseSideBar}>
              <MenuLink item={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className="p-7">
        {getMe?.matchingAt && (
          <div className="text-white text-[14px] text-center pb-4">
            <div> 前回学習完了日時:</div>
            <div>{format(getMe.matchingAt, 'yyyy-MM-dd HH:mm')}</div>
          </div>
        )}
        <AppButton
          disabled={!!getMe?.matchingCount}
          text="再学習"
          className={`flex items-center justify-center ${!!getMe?.matchingCount ? 'rotate-icon' : ''}`}
          icon={<SyncOutlinedIcon />}
          onClick={handleMatching}
        />
      </div>
    </div>
  )
}

export default Sidebar
