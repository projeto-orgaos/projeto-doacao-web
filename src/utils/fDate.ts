import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Convert datetime in brazilian format datetime

export const fDate = (date: string): string => {
  return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
};

export const fDateTime = (date: string): string => {
    return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR });
    }
