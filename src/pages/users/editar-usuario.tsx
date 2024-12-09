import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { MainLayout } from "@src/layout/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstanceAuthenticated } from "@src/api/api";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    birth_date: "",
    gender: "",
    mother_name: "",
    phone: "",
    blood_type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get(`/users/${id}`);
        const userData = response.data.data;

        setFormData({
          name: userData.name,
          email: userData.email,
          cpf: userData.cpf,
          birth_date: userData.birth_date,
          gender: userData.gender,
          mother_name: userData.mother_name,
          phone: userData.phone,
          blood_type: userData.blood_type
        });
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Erro ao carregar usuário",
          description: error.response?.data?.message || "Erro desconhecido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (id) fetchUserData();
  }, [id, navigate, toast]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/usuarios");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axiosInstanceAuthenticated.put(`/users/${id}`, formData);
      toast({
        title: "Usuário atualizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/usuarios");
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar usuário",
        description: error.response?.data?.message || "Erro desconhecido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <Box
        mx="auto"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
        bg="white"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Editar Usuário
        </Heading>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={8}>
            <FormControl gridColumn={{ base: "span 12", md: "span 6" }}>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 6" }}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 4" }}>
              <FormLabel>CPF</FormLabel>
              <Input
                placeholder="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 4" }}>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 4" }}>
              <FormLabel>Gênero</FormLabel>
              <Select
                placeholder="Selecione"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                borderRadius="md"
              >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </Select>
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 6" }}>
              <FormLabel>Nome da Mãe</FormLabel>
              <Input
                placeholder="Nome da mãe"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 4" }}>
              <FormLabel>Telefone</FormLabel>
              <Input
                placeholder="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 4" }}>
              <FormLabel>Tipo Sanguíneo</FormLabel>
              <Select
                placeholder="Selecione"
                name="blood_type"
                value={formData.blood_type}
                onChange={handleInputChange}
                borderRadius="md"
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Select>
            </FormControl>

          </Grid>

          <Flex mt={6} justifyContent="flex-end">
            <Button
              type="button"
              colorScheme="red"
              size="md"
              onClick={handleCancel}
              isDisabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              size="md"
              ml={4}
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Box>
    </MainLayout>
  );
}
