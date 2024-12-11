import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { axiosInstanceAuthenticated } from "@src/api/api";
import { MainLayout } from "@src/layout/mainLayout";
import { Link } from "react-router-dom";
import { getStatusText } from "@src/utils/status.enum";

// Tipagens
type OrganType = {
  id: number;
  name: string;
  description: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

type Organ = {
  id: number;
  status: string;
  expiration_date: string;
  hospital_id: number | null;
  type: OrganType;
  donor: User | null;
  recipient: User | null;
};

export default function OrgaosPage() {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchOrgans = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get("/organs");
        setOrgans(response.data.data);
      } catch (error) {
        toast({
          title: "Erro ao carregar órgãos",
          description: "Não foi possível carregar os dados.",
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

  const handleDelete = (id: number) => {
    // Função de exclusão
    toast({
      title: "Órgão excluído",
      description: `Órgão com ID ${id} foi excluído.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <MainLayout>
      <Flex minH="85vh" p={4}>
        <Box as="main" flex="1">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="2xl" mb={4}>
              Órgãos
            </Text>
            <Button as={Link} to="/tipos-orgaos" colorScheme="teal">
              Tipos de Órgãos
            </Button>
          </Flex>

          {loading ? (
            <Flex justifyContent="center" alignItems="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <Table variant="simple" size="lg">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Órgão</Th>
                  <Th>Status</Th>
                  <Th>Usuário</Th>
                  <Th>Tipo de Usuário</Th>
                  <Th>Data de Expiração</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {organs.map((organ) => (
                  <Tr key={organ.id}>
                    <Td>{organ.id}</Td>
                    <Td>{organ.type.name}</Td>
                    <Td>{getStatusText(organ.status)}</Td>
                    <Td>
                      {organ.donor?.name || organ.recipient?.name || "N/A"}
                    </Td>
                    <Td>{organ.donor ? "Doador" : "Receptor"}</Td>
                    <Td>
                      {new Date(organ.expiration_date).toLocaleDateString(
                        "pt-BR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Td>
                    <Td>
                      <HStack>
                        <IconButton
                          aria-label={`Excluir órgão ${organ.id}`}
                          icon={<FiTrash />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDelete(organ.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Flex>
    </MainLayout>
  );
}
