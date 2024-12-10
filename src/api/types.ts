// Tipagem para o Perfil do Usuário
export interface IProfile {
    id: number;
    description: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
  }
  

  
  // Tipagem para o Retorno da API de Login
  export interface LoginResponse {
    status: string;
    message: string;
    access_token: string;
    user: IUser;
  }
  
  // Tipagem para o Contexto do Usuário no Aplicativo
  export interface AuthContextData {
    accessToken: string; // Token JWT
    user: IUser;          // Dados do usuário logado
    isAuthenticated: boolean; // Indica se o usuário está autenticado
  }

  export interface LoginResponse {
    status: string;
    message: string;
    access_token: string;
    user: IUser;
  }
  

export type CompatibilityCriteria = {
age_range?: [number, number];
blood_type?: string[];
hla_compatibility?: boolean;
};
  
export type  IOrgan = {
id: number;
name: string;
description: string;
default_preservation_time_minutes: number; // Alterado para refletir tempo em minutos
compatibility_criteria: CompatibilityCriteria;
is_post_mortem: boolean;
};

export interface IAddress {
    id: number;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  }
  
export   interface IHospital {
    id: number;
    name: string;
    registration_number: string;
    phone: string;
    email: string;
    responsible: string;
    cnpj: string;
    address: IAddress;
  }

  // Tipagem para o Usuário
  export interface IUser {
    id: number;
    name: string;
    email: string;
    cpf: string;
    birth_date: string; // ISO 8601 format
    gender: string;
    mother_name: string | null;
    previous_diseases: string | null;
    email_verified_at: string | null;
    profile_id: number;
    phone: string;
    blood_type: string | null;
    address_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    profile: IProfile;
    address: IAddress;
  }