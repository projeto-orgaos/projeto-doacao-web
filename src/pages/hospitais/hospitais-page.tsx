import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiTrash, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MainLayout } from "@src/layout/mainLayout";
import { axiosInstanceAuthenticated } from "@src/api/api";
import { IHospital } from "@src/api/types";



export default function HospitaisPage() {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<IHospital[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get("/hospitals");
        setHospitals(response.data.data);
        setFilteredHospitals(response.data.data); // Inicialmente, todos os hospitais
      } catch (error: any) {
        toast({
          title: "Erro ao carregar hospitais",
          description: error.response?.data?.message || "Erro desconhecido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [toast]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredHospitals(
      hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(value)
      )
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstanceAuthenticated.delete(`/hospitals/${id}`);
      setHospitals((prev) => prev.filter((hospital) => hospital.id !== id));
      setFilteredHospitals((prev) => prev.filter((hospital) => hospital.id !== id));
      toast({
        title: "Hospital removido com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao remover hospital",
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
            Hospitais
          </Text>
          <Button as={Link} to="/registrar-hospital" colorScheme="teal">
            Novo Hospital
          </Button>
        </Flex>

        <InputGroup mb={6}>
          <InputLeftElement pointerEvents="none" children={<FiSearch />} />
          <Input
            placeholder="Pesquisar por nome do hospital"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" minH="50vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Box>
            {filteredHospitals.map((hospital) => (
              <Box
                key={hospital.id}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                mb={4}
                bg="white"
                boxShadow="sm"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">
                      {hospital.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {hospital.email}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Telefone: {hospital.phone}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Responsável: {hospital.responsible}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      CNPJ: {hospital.cnpj}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Endereço: {hospital.address.street}, {hospital.address.number},{" "}
                      {hospital.address.city} - {hospital.address.state}
                    </Text>
                  </Box>
                  <HStack spacing={2}>
                    <IconButton
                      as={Link}
                      to={`/editar-hospital/${hospital.id}`}
                      aria-label={`Editar ${hospital.name}`}
                      icon={<FiEdit />}
                      colorScheme="teal"
                      size="sm"
                    />
                    <IconButton
                      aria-label={`Excluir ${hospital.name}`}
                      icon={<FiTrash />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(hospital.id)}
                    />
                  </HStack>
                </Flex>
              </Box>
            ))}
          </Box>
        )}
      </Flex>
    </MainLayout>
  );
}
