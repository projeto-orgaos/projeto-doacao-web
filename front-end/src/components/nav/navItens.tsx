import { HiMiniHome } from "react-icons/hi2";
import { BiSolidUserCircle } from "react-icons/bi";
import { RiUserReceivedFill, RiUserShared2Fill } from "react-icons/ri";
import { GiHeartOrgan } from "react-icons/gi";
import { FaHospital } from "react-icons/fa";




export type ListItem = {
  text?: string
  icon: React.ElementType
  path: string
}

export const listItems: ListItem[] = [
  {
    text: 'Dashboard',
    icon: HiMiniHome,
    path: '/home'
  },
  {
    text: 'Orgãos',
    icon: GiHeartOrgan,
    path: '/orgaos'
  },
  {
    text: 'Doadores',
    icon: RiUserShared2Fill,
    path: '/doadores'
  },
  {
    text: 'Receptores',
    icon: RiUserReceivedFill,
    path: '/receptores'
  },
  {
    text: 'Usuários',
    icon: BiSolidUserCircle,
    path: '/usuarios'
  },
  {
    text: 'Hospitais',
    icon: FaHospital,
    path: '/hospitais'
  },
]
