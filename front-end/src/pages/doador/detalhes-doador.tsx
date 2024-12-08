import { MainLayout } from "@src/layout/mainLayout";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState } from "react";

// Simulação de dados dos usuários
const donors = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    gender: "Male",
    bloodType: "O+",
    birthDate: new Date("1990-01-01"),
    organs: [
      { id: 1, name: "Coração" },
      { id: 2, name: "Rim" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    gender: "Female",
    bloodType: "A-",
    birthDate: new Date("1985-05-15"),
    organs: [{ id: 3, name: "Fígado" }],
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "456-789-0123",
    gender: "Female",
    bloodType: "B+",
    birthDate: new Date("1992-07-20"),
    organs: [],
  },
];

export default function DoadoresDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const donor = donors.find((d) => d.id === Number(id));
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newOrgan, setNewOrgan] = useState("");
  
    // Lista de órgãos disponíveis para seleção
    const availableOrgans = [
      "Coração",
      "Rim",
      "Fígado",
      "Pulmão",
      "Pâncreas",
      "Intestino",
      "Córnea",
      "Medula Óssea",
    ];
  
    const handleAddOrgan = () => {
      if (newOrgan.trim()) {
        donor?.organs.push({ id: donor?.organs.length + 1 || 1, name: newOrgan });
        setNewOrgan("");
        onClose();
      }
    };
  
    if (!donor) {
      return (
        <MainLayout>
          <Box textAlign="center" p={10}>
            <Heading size="lg">Usuário não encontrado</Heading>
          </Box>
        </MainLayout>
      );
    }
  
    return (
      <MainLayout>
        <Box p={6}>
          {/* Card com todos os dados do receptor */}
          <Box
            bg="teal.500"
            color="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
            mb={6}
          >
            <Heading size="lg" mb={4}>
              {donor.name}
            </Heading>
            <Box
              display="grid"
              gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={4}
            >
              {/* Informações à esquerda */}
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
                  <Text>{donor.gender}</Text>
                </HStack>
              </VStack>
  
              {/* Informações à direita */}
              <VStack align="start" spacing={2}>
                <HStack>
                  <Text fontWeight="bold">Tipo Sanguíneo:</Text>
                  <Text>{donor.bloodType}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Data de Nascimento:</Text>
                  <Text>
                    {donor.birthDate.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </Box>
  
          {/* Tabela com os órgãos desejados */}
          <Box
            p={6}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            bg="white"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="md">Órgãos a serem doados</Heading>
              <Button onClick={onOpen} colorScheme="teal" size="sm">
                Adicionar Órgão
              </Button>
            </Flex>
            {donor.organs.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Órgão</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {donor.organs.map((organ) => (
                    <Tr key={organ.id}>
                      <Td>{organ.id}</Td>
                      <Td>{organ.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>Nenhum órgão desejado foi adicionado.</Text>
            )}
          </Box>
        </Box>
  
        {/* Modal para adicionar órgão */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Órgão para Doação</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select
                placeholder="Selecione um órgão"
                value={newOrgan}
                onChange={(e) => setNewOrgan(e.target.value)}
              >
                {availableOrgans.map((organ, index) => (
                  <option key={index} value={organ}>
                    {organ}
                  </option>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleAddOrgan}>
                Adicionar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </MainLayout>
    );
  }
  
