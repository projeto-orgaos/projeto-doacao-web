import { MainLayout } from "@src/layout/mainLayout";
import {
    Box,
    Flex,
    Text,
    HStack,
    IconButton,
  } from "@chakra-ui/react";
  import { DataTable } from "@src/components/table/table";
  import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
  
  type Donor = {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    bloodType: string;
    birthDate: Date;
  };
  
  const donors: Donor[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", gender: "Male", bloodType: "O+", birthDate: new Date("1990-01-01") },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", gender: "Female", bloodType: "A-", birthDate: new Date("1985-05-15") },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "456-789-0123", gender: "Female", bloodType: "B+", birthDate: new Date("1992-07-20") },
  ];
  
  const columns: Array<{ header: string; accessor?: keyof Donor; render?: (row: Donor) => JSX.Element }> = [
    { header: "Nome", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Telefone", accessor: "phone" },
    { header: "Gênero", accessor: "gender" },
    { header: "Tipo Sanguíneo", accessor: "bloodType" },
    { header: "Data de Nascimento", accessor: "birthDate" },
    {
      header: "Ações", render: (row) => (
        <HStack>
          <IconButton
          as={Link}
            to={`/receptores/${row.id}`}
            aria-label={`Detalhes ${row.name}`}
            icon={<FiEye />}
            colorScheme="teal"
            size="sm"
          />
        </HStack>
      )
    },
  ];
  
  export default function ReceptoresPage() {
    return (
    <MainLayout>
      <Flex minH="100vh" p={4}>
        <Box as="main" flex="1">
          <Text fontSize="2xl" mb={4}>Receptores</Text>
          <DataTable columns={columns} data={donors} />
        </Box>
      </Flex>
      </MainLayout>
    );
  }
  