import { HiMiniHome } from "react-icons/hi2";
import { BiSolidUserCircle } from "react-icons/bi";
import { RiUserReceivedFill, RiUserShared2Fill } from "react-icons/ri";
import { GiHeartOrgan } from "react-icons/gi";
import { FaHospital } from "react-icons/fa";

export type ListItem = {
  text?: string;
  icon: React.ElementType;
  path: string;
};

const user = JSON.parse(localStorage.getItem("user_data") || "{}");

const isAdmin = user.profile_id === 1; // Verifica se o usuário é administrador

export const listItems: ListItem[] = [
  {
    text: "Dashboard",
    icon: HiMiniHome,
    path: "/home",
  },
  ...(isAdmin
    ? [
        {
          text: "Órgãos",
          icon: GiHeartOrgan,
          path: "/orgaos",
        },
        {
          text: "Doadores",
          icon: RiUserShared2Fill,
          path: "/doadores",
        },
        {
          text: "Receptores",
          icon: RiUserReceivedFill,
          path: "/receptores",
        },
        {
          text: "Usuários",
          icon: BiSolidUserCircle,
          path: "/usuarios",
        },
        {
          text: "Hospitais",
          icon: FaHospital,
          path: "/hospitais",
        },
      ]
    : []), // Somente administradores terão acesso a essas rotas
];
