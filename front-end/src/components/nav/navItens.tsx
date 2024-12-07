import { AiOutlineHome, AiOutlineSetting, AiOutlineUserSwitch } from 'react-icons/ai'

export type ListItem = {
  text?: string
  icon: React.ElementType
  path: string
}

export const listItems: ListItem[] = [
  {
    text: 'Dashboard',
    icon: AiOutlineHome,
    path: '/home'
  },
  {
    text: 'Doadores',
    icon: AiOutlineSetting,
    path: '/doadores'
  },
  {
    text: 'Orgãos',
    icon: AiOutlineUserSwitch,
    path: '/orgaos'
  },
]
