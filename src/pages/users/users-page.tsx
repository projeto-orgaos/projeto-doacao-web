import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiTrash, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MainLayout } from "@src/layout/mainLayout";
import { axiosInstanceAuthenticated } from "@src/api/api";
import { IUser } from "@src/api/types";



export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get("/users");
        setUsers(response.data.data);
        setFilteredUsers(response.data.data); // Inicializa com todos os usuários
      } catch (error: any) {
        toast({
          title: "Erro ao carregar usuários",
          description: error.response?.data?.message || "Erro desconhecido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value) ||
        user.profile.description.toLowerCase().includes(value) // Adiciona a busca por tipo de usuário

      )
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstanceAuthenticated.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
      toast({
        title: "Usuário excluído com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir usuário",
        description: error.response?.data?.message || "Erro desconhecido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <MainLayout>
      <Flex minH="100vh" p={4} direction="column">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Usuários
          </Text>
          <Button as={Link} to="/registrar-usuario" colorScheme="teal">
            Novo Usuário
          </Button>
        </Flex>

        <InputGroup mb={6}>
          <InputLeftElement pointerEvents="none" children={<FiSearch />} />
          <Input
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" minH="50vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>CPF</Th>
                  <Th>Email</Th>
                  <Th>Telefone</Th>
                  <Th>Tipo de Usuário</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.cpf}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone}</Td>
                    <Td>{user.profile.description}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          as={Link}
                          to={`/editar-usuario/${user.id}`}
                          aria-label={`Editar ${user.name}`}
                          icon={<FiEdit />}
                          colorScheme="teal"
                          size="sm"
                        />
                        <IconButton
                          aria-label={`Excluir ${user.name}`}
                          icon={<FiTrash />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Flex>
    </MainLayout>
  );
}
