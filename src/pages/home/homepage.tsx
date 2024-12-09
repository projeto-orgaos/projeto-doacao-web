import React, { useEffect, useState } from "react";
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
  Spinner,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { MainLayout } from "@src/layout/mainLayout";
import { axiosInstanceAuthenticated } from "@src/api/api";
import { getStatusText } from "@src/utils/status.enum";

type OrganType = {
  id: number;
  name: string;
  description: string;
};

type Organ = {
  id: number;
  status: string;
  expiration_date: string;
  donor_id: number | null;
  recipient_id: number | null;
  type: OrganType;
};

export default function Home() {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  const bgMain = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchOrgans = async () => {
      try {
        // Recupera o usuário do localStorage
        const user = JSON.parse(localStorage.getItem("user_data") || "{}");
        const userId = user?.id;
        console.log(userId);
        if (!userId) {
          throw new Error("Usuário não encontrado no localStorage.");
        }

        // Faz a chamada para buscar os órgãos do usuário
        const response = await axiosInstanceAuthenticated.get(`/users/${userId}/organs`);
        setOrgans(response.data.data);
      } catch (error: any) {
        toast({
          title: "Erro ao carregar órgãos",
          description: error.response?.data?.message || "Erro desconhecido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrgans();
  }, [toast]);

  const donorOrgans = organs.filter((organ) => organ.donor_id !== null);
  const recipientOrgans = organs.filter((organ) => organ.recipient_id !== null);

  return (
    <MainLayout>
      <Box as="main" flex="1" p={4} bg={bgMain}>
        <Text fontSize="2xl" mb={4}>
          Seus Órgãos Registrados
        </Text>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" minH="50vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            {/* Tabela de órgãos para doação */}
            <Box mb={8}>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Órgãos para Doação
              </Text>
              {donorOrgans.length > 0 ? (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Órgão</Th>
                      <Th>Status</Th>
                      <Th>Data de Expiração</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {donorOrgans.map((organ) => (
                      <Tr key={organ.id}>
                        <Td>{organ.id}</Td>
                        <Td>{organ.type.name}</Td>
                        <Td>{getStatusText(organ.status)}</Td>
                        <Td>
                          {new Date(organ.expiration_date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Text>Nenhum órgão registrado para doação.</Text>
              )}
            </Box>

            {/* Tabela de órgãos para recepção */}
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Órgãos para Recepção
              </Text>
              {recipientOrgans.length > 0 ? (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Órgão</Th>
                      <Th>Status</Th>
                      <Th>Data de Expiração</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recipientOrgans.map((organ) => (
                      <Tr key={organ.id}>
                        <Td>{organ.id}</Td>
                        <Td>{organ.type.name}</Td>
                        <Td>{getStatusText(organ.status)}</Td>
                        <Td>
                          {new Date(organ.expiration_date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Text>Nenhum órgão registrado para recepção.</Text>
              )}
            </Box>
          </>
        )}
      </Box>
    </MainLayout>
  );
}
