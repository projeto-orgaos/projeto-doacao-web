import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@src/layout/mainLayout";
import { axiosInstanceAuthenticated } from "@src/api/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import OrganSelectionModal from "@src/components/OrganSelectionModal";

type Organ = {
  id: number;
  type: {
    id: number;
    name: string;
    description: string;
  };
};

type UserDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  blood_type: string;
  birth_date: string;
  organs: Organ[];
};

export default function ReceptorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstanceAuthenticated.get(`/users/${id}`);
      setUser(response.data.data);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar receptor",
        description: error.response?.data?.message || "Erro desconhecido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUserDetails();
  }, [id, toast]);

  if (loading) {
    return (
      <MainLayout>
        <Flex justifyContent="center" alignItems="center" minH="85vh">
          <Spinner size="xl" />
        </Flex>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <Box textAlign="center" p={10}>
          <Heading size="lg">Receptor não encontrado</Heading>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box p={6}>
        {/* Card com dados do receptor */}
        <Box
          bg="teal.500"
          color="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          mb={6}
        >
          <Heading size="lg" mb={4}>
            {user.name}
          </Heading>
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={4}
          >
            <VStack align="start" spacing={2}>
              <HStack>
                <Text fontWeight="bold">Email:</Text>
                <Text>{user.email}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Telefone:</Text>
                <Text>{user.phone}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Gênero:</Text>
                <Text>{user.gender === "male" ? "Masculino" : "Feminino"}</Text>
              </HStack>
            </VStack>

            <VStack align="start" spacing={2}>
              <HStack>
                <Text fontWeight="bold">Tipo Sanguíneo:</Text>
                <Text>{user.blood_type}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Data de Nascimento:</Text>
                <Text>
                  {format(new Date(user.birth_date), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        {/* Tabela com órgãos desejados */}
        <Box
          p={6}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="sm"
          bg="white"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="md">Órgãos Desejados</Heading>
            <Button onClick={onOpen} colorScheme="teal" size="sm">
              Adicionar Órgão
            </Button>
          </Flex>
          {user.organs.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Órgão</Th>
                  <Th>Descrição</Th>
                </Tr>
              </Thead>
              <Tbody>
                {user.organs.map((organ) => (
                  <Tr key={organ.id}>
                    <Td>{organ.id}</Td>
                    <Td>{organ.type.name}</Td>
                    <Td>{organ.type.description}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>Nenhum órgão desejado foi adicionado.</Text>
          )}
        </Box>
      </Box>

      <OrganSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        userId={Number(id)}
        userType="recipient"
      />
    </MainLayout>
  );
}
