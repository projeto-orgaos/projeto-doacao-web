import { MainLayout } from "@src/layout/mainLayout";
import {
    Box,
    Flex,
    Text,
    HStack,
    IconButton,
    Button,
  } from "@chakra-ui/react";
  import { DataTable } from "@src/components/table/table";
  import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
  
  type Orgaos = {
    id: number;
    orgao_type: string;
    user_type: string;
    expiration_date: Date;
    distance_limit: number;
    hospital_id: number;
    user_id: number;
  };
  
  const orgaos: Orgaos[] = [
    { id: 1, orgao_type: "Coração", user_type:'Doador', expiration_date: new Date("2022-12-31"), distance_limit: 100, hospital_id: 1, user_id: 1 },
    { id: 2, orgao_type: "Fígado", user_type:'Receptor', expiration_date: new Date("2022-12-31"), distance_limit: 100, hospital_id: 1, user_id: 2 },
    { id: 3, orgao_type: "Pulmão", user_type:'Doador', expiration_date: new Date("2022-12-31"), distance_limit: 100, hospital_id: 1, user_id: 3 },
  ];
  
  const columns: Array<{ header: string; accessor?: keyof Orgaos; render?: (row: Orgaos) => JSX.Element }> = [
    { header: "Orgão", accessor: "orgao_type" },
    { header: "Usuário", accessor: "user_id" },
    { header: "Hospital", accessor: "hospital_id" },
    { header: "Limite de Distância", accessor: "distance_limit" },
    { header: "Data de Expiração", accessor: "expiration_date" },
    { header: "Tipo de Usuário", accessor: "user_type" },
    {
      header: "Ações", render: (row) => (
        <HStack>
          
          <IconButton
            aria-label={`Excluir ${row.orgao_type}`}
            icon={<FiTrash />}
            colorScheme="red"
            size="sm"
          />
        </HStack>
      )
    },
  ];
  
  export default function OrgaosPage() {
    return (
    <MainLayout>
      <Flex minH="100vh" p={4}>
        <Box as="main" flex="1">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="2xl" mb={4}>Orgãos</Text>
          <Button
            as={Link}
            to="/tipos-orgaos"
            >
            Tipos de Orgãos
            </Button>
      
          </Flex>
          <DataTable columns={columns} data={orgaos} />
        </Box>
      </Flex>
      </MainLayout>
    );
  }
  