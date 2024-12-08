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
    text: 'Orgãos',
    icon: AiOutlineUserSwitch,
    path: '/orgaos'
  },
  {
    text: 'Doadores',
    icon: AiOutlineSetting,
    path: '/doadores'
  },
  {
    text: 'Receptores',
    icon: AiOutlineSetting,
    path: '/receptores'
  },
  {
    text: 'Usuários',
    icon: AiOutlineUserSwitch,
    path: '/usuarios'
  },
  {
    text: 'Hospitais',
    icon: AiOutlineUserSwitch,
    path: '/hospitais'
  },
]
