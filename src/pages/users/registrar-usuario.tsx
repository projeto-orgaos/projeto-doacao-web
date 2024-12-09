import React, { useState } from "react";
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
  Text,
  useToast,
} from "@chakra-ui/react";
import { MainLayout } from "@src/layout/mainLayout";
import { Form, useNavigate } from "react-router-dom";
import { axiosInstanceAuthenticated } from "@src/api/api";

export default function RegisterUserPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_id: "1", // Força o ID do perfil administrador
    phone: "",
    blood_type: "",
    cpf: "",
    birth_date: "",
    gender: "",
    mother_name: "",
    previous_diseases: "",
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const handleCancel = () => {
    navigate("/usuarios");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      await axiosInstanceAuthenticated.post("/users", formData);

      toast({
        title: "Usuário cadastrado com sucesso!",
        description: "Somente usuários administradores podem ser criados.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/usuarios");
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar usuário",
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
          Registro de Usuário
        </Heading>
        <Text fontSize="sm" mb={4} color="gray.600" textAlign="center">
          <strong>Nota:</strong> Somente usuários com perfil de <strong>administrador</strong> podem ser registrados.
        </Text>
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
                placeholder="Seu email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 4" }}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 4" }}>
              <FormLabel>Telefone</FormLabel>
              <Input
                type="tel"
                placeholder="Seu telefone"
                name="phone"
                value={formData.phone}
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
          </Grid>

          <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={8}>
            <FormControl gridColumn="span 8">
              <FormLabel>Rua</FormLabel>
              <Input
                placeholder="Rua"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Número</FormLabel>
              <Input
                placeholder="Número"
                name="address.number"
                value={formData.address.number}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Complemento</FormLabel>
              <Input
                placeholder="Complemento"
                name="address.complement"
                value={formData.address.complement}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn="span 4">
              <FormLabel>Bairro</FormLabel>
              <Input
                placeholder="Bairro"
                name="address.neighborhood"
                value={formData.address.neighborhood}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn="span 4">
              <FormLabel>Cidade</FormLabel>
              <Input
                placeholder="Cidade"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Estado</FormLabel>
              <Input
                placeholder="Estado"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>CEP</FormLabel>
              <Input
                placeholder="CEP"
                name="address.zip_code"
                value={formData.address.zip_code}
                onChange={handleInputChange}
                borderRadius="md"
              />
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
              Registrar
            </Button>
          </Flex>
        </form>
      </Box>
    </MainLayout>
  );
}
