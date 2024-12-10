import { useEffect, useState } from "react";
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
  Badge,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { axiosInstanceAuthenticated } from "@src/api/api";
import { MainLayout } from "@src/layout/mainLayout";
import OrganSelectionModal from "@src/components/OrganSelectionModal";
import { getStatusText } from "@src/utils/status.enum";
import { fDateTime } from "@src/utils/fDate";

type Organ = {
  id: number;
  status: string;
  expiration_date: string;
  type: {
    id: number;
    name: string;
    description: string;
    default_preservation_time_minutes: number;
    compatibility_criteria: Record<string, any>;
    is_post_mortem: boolean;
  };
};

type Donor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  bloodType: string;
  birthDate: string; // ISO format date
  organs: Organ[];
};

export default function DoadoresDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchDonorDetails = async () => {
    try {
      const response = await axiosInstanceAuthenticated.get(`/users/${id}`);
      setDonor(response.data.data);
    } catch (error) {
      toast({
        title: "Erro ao carregar doador",
        description: "Não foi possível carregar os dados do doador.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDonorDetails();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner size="xl" />
        </Flex>
      </MainLayout>
    );
  }

  if (!donor) {
    return (
      <MainLayout>
        <Box textAlign="center" p={10}>
          <Heading size="lg">Doador não encontrado</Heading>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box p={6}>
        {/* Card com informações do doador */}
        <Box bg="blue.500" color="white" p={6} borderRadius="md" boxShadow="lg" mb={6}>
          <Heading size="lg" mb={4}>
            {donor.name}
          </Heading>
          <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <VStack align="start" spacing={2}>
              <HStack>
                <Text fontWeight="bold">Email:</Text>
                <Text>{donor.email}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Telefone:</Text>
                <Text>{donor.phone}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Gênero:</Text>
                <Text>{donor.gender === "male" ? "Masculino" : "Feminino"}</Text>
              </HStack>
            </VStack>
            <VStack align="start" spacing={2}>
              <HStack>
                <Text fontWeight="bold">Tipo Sanguíneo:</Text>
                <Text>{donor.bloodType}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Data de Nascimento:</Text>
                <Text>
                  {new Date(donor.birthDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        {/* Tabela de órgãos disponíveis para doação */}
        <Box p={6} borderWidth="1px" borderRadius="md" boxShadow="sm" bg="white">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="md">Órgãos Disponíveis para Doação</Heading>
            <Button onClick={onOpen} colorScheme="blue" size="sm">
              Adicionar Órgão
            </Button>
          </Flex>
          {donor.organs.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Órgão</Th>
                  <Th>Status</Th>
                  <Th>Data de Expiração</Th>
                  <Th>Post-mortem?</Th>
                </Tr>
              </Thead>
              <Tbody>
                {donor.organs.map((organ) => (
                  <Tr key={organ.id}>
                    <Td>{organ.id}</Td>
                    <Td>{organ.type.name}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          organ.status === "Pending"
                            ? "yellow"
                            : organ.status === "Matched"
                            ? "green"
                            : "red"
                        }
                      >
                        {getStatusText(organ.status)}
                    
                      </Badge>
                    </Td>
                    <Td>
                      {fDateTime(organ.expiration_date)}  
                    </Td>
                    <Td>{organ.type.is_post_mortem ? "Sim" : "Não"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>Nenhum órgão disponível para doação foi adicionado.</Text>
          )}
        </Box>
      </Box>

      <OrganSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        userId={Number(id)}
        userType="donor"
      />
    </MainLayout>
  );
}
