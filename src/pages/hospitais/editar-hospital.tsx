import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { MainLayout } from "@src/layout/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstanceAuthenticated } from "@src/api/api";

export default function EditHospitalPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    registration_number: "",
    phone: "",
    cnpj: "",
    responsible: "",
    email: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zip_code: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        if (id) {
          const response = await axiosInstanceAuthenticated.get(`/hospitals/${id}`);
          setFormData(response.data.data);
        }
      } catch (error: any) {
        toast({
          title: "Erro ao carregar hospital",
          description: error.response?.data?.message || "Erro desconhecido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/hospitais");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [id, navigate, toast]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [addressField]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      if (id) {
        await axiosInstanceAuthenticated.put(`/hospitals/${id}`, formData);
        toast({
          title: "Hospital atualizado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await axiosInstanceAuthenticated.post("/hospitals", formData);
        toast({
          title: "Hospital registrado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate("/hospitais");
    } catch (error: any) {
      toast({
        title: "Erro ao salvar hospital",
        description: error.response?.data?.message || "Erro desconhecido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/hospitais");
  };

  if (loading) {
    return (
      <MainLayout>
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner size="xl" />
        </Flex>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box
        mx="auto"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        maxWidth="800px"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          {id ? "Editar Hospital" : "Registrar Hospital"}
        </Heading>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(12, 1fr)" gap={4} mb={6}>
            <FormControl gridColumn="span 6">
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Nome do Hospital"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 6">
              <FormLabel>Número de Registro</FormLabel>
              <Input
                placeholder="Número de Registro"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 6">
              <FormLabel>Responsável</FormLabel>
              <Input
                placeholder="Responsável"
                name="responsible"
                value={formData.responsible}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 6">
              <FormLabel>CNPJ</FormLabel>
              <Input
                placeholder="CNPJ"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 6">
              <FormLabel>Telefone</FormLabel>
              <Input
                placeholder="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 6">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Heading as="h4" size="md" textAlign="left" mb={4}>
            Endereço
          </Heading>
          <Grid templateColumns="repeat(12, 1fr)" gap={4} mb={6}>
            <FormControl gridColumn="span 6">
              <FormLabel>Rua</FormLabel>
              <Input
                placeholder="Rua"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 3">
              <FormLabel>Número</FormLabel>
              <Input
                placeholder="Número"
                name="address.number"
                value={formData.address.number}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 3">
              <FormLabel>Complemento</FormLabel>
              <Input
                placeholder="Complemento"
                name="address.complement"
                value={formData.address.complement}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 4">
              <FormLabel>Bairro</FormLabel>
              <Input
                placeholder="Bairro"
                name="address.neighborhood"
                value={formData.address.neighborhood}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 4">
              <FormLabel>Cidade</FormLabel>
              <Input
                placeholder="Cidade"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Estado</FormLabel>
              <Input
                placeholder="Estado"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>CEP</FormLabel>
              <Input
                placeholder="CEP"
                name="address.zip_code"
                value={formData.address.zip_code}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Flex mt={6} justifyContent="flex-end">
            <Button type="button" colorScheme="red" size="md" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="teal" size="md" ml={4} isLoading={isSubmitting}>
              {id ? "Salvar" : "Registrar"}
            </Button>
          </Flex>
        </form>
      </Box>
    </MainLayout>
  );
}
