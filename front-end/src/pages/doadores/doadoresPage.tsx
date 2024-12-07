import { Head } from "@src/components";
import { MainLayout } from "../../layout/mainLayout";
import { BrandName } from "@src/constants";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

type Donor = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const donors: Donor[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "456-789-0123" },
];

export default function DoadoresPage() {
  return (
    <MainLayout>
      <Head>
        <title>Doadores | {BrandName}</title>
      </Head>
      <Flex minH="100vh">
        {/* CONTEÚDO PRINCIPAL */}
        <Box as="main" flex="1" p={4}>
          <Text fontSize="2xl" mb={4}>Doadores</Text>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Email</Th>
                  <Th>Telefone</Th>
                </Tr>
              </Thead>
              <Tbody>
                {donors.map((donor) => (
                  <Tr key={donor.id}>
                    <Td>{donor.id}</Td>
                    <Td>{donor.name}</Td>
                    <Td>{donor.email}</Td>
                    <Td>{donor.phone}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </MainLayout>
  );
}
