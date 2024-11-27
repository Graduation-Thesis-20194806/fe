'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { MenuItem } from '@/common/types'

type Props = {
  item: MenuItem
}

const MenuLink = ({ item }: Props) => {
  const pathname = usePathname()
  return (
    <Link
      href={item.path}
      className={clsx('flex px-7 py-3 gap-3', {
        'bg-[#40509E] text-white font-semibold rounded': pathname === item.path,
      })}
    >
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink
