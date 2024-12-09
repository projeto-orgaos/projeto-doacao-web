// 'Available', 'Donated', 'In Use', 'Expired', 'Pending', 'Waiting'


export const Status = {
    Available: 'Disponível',
    Donated
    : 'Doado',
    InUse: 'Em Uso',
    Expired: 'Expirado',
    Pending: 'Cadastrado para Doação',
    Waiting: 'Aguardando'
    } as const;
export type Status = typeof Status[keyof typeof Status];


export const getStatusText = (status: string) => {  
    switch (status) {
        case 'Available':
            return 'Disponível';
        case 'Donated':
            return 'Doado';
        case 'InUse':
            return 'Em Uso';
        case 'Expired':
            return 'Expirado';
        case 'Pending':
            return 'Cadastrado para Doação';
        case 'Waiting':
            return 'Aguardando';
    }
}