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
  import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

  
  type Donor = {
    id: number;
    name: string;
    email: string;
    phone: string;
    userType: string;
  };
  
  const donors: Donor[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", userType: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210",userType: "Admin" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "456-789-0123", userType: "Admin" },
  ];
  
  const columns: Array<{ header: string; accessor?: keyof Donor; render?: (row: Donor) => JSX.Element }> = [
    { header: "Nome", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Telefone", accessor: "phone" },
    { header: "Tipo de Usuário", accessor: "userType" },
    {
      header: "Ações", render: (row) => (
        <HStack>
          <IconButton
            as={Link}
            to={`/editar-usuario/${row.id}`}
            aria-label={`Editar ${row.name}`}
            icon={<FiEdit />}
            colorScheme="teal"
            size="sm"
          />
          <IconButton
            aria-label={`Excluir ${row.name}`}
            icon={<FiTrash />}
            colorScheme="red"
            size="sm"
          />
        </HStack>
      )
    },
  ];
  
  export default function UsersPage() {
    return (
      <MainLayout>
      <Flex minH="100vh" p={4}>
        <Box as="main" flex="1">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="2xl">Usuários</Text>
            <Button
              as={Link}
              to="/registrar-usuario"
              colorScheme="teal"
            >
              Novo Usuário
            </Button>
          </Flex>
          <DataTable columns={columns} data={donors} />
        </Box>
      </Flex>
    </MainLayout>
    );
  }
  