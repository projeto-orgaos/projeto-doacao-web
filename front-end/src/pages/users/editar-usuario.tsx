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
} from "@chakra-ui/react";
import { MainLayout } from "@src/layout/mainLayout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_id: "",
    phone: "",
    blood_type: "",
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

  // Simulação de carregamento de dados do usuário para edição
  useEffect(() => {
    // Substitua esta simulação por uma chamada à API
    const fetchUserData = async () => {
      const userData = {
        name: "João Silva",
        email: "joao.silva@example.com",
        password: "",
        profile_id: "",
        phone: "11987654321",
        blood_type: "O+",
        address: {
          street: "Rua Principal",
          number: "123",
          complement: "Apt 45",
          neighborhood: "Centro",
          city: "São Paulo",
          state: "SP",
          zip_code: "12345-678",
        },
      };
      setFormData(userData);
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Editando usuário com ID: ${id}`, formData);
    // Substitua por uma solicitação PUT/POST para o backend
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
                placeholder="Seu email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 5" }}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="Deixe vazio para manter"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </FormControl>

            <FormControl gridColumn={{ base: "span 12", md: "span 5" }}>
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

            <FormControl gridColumn={{ base: "span 12", md: "span 2" }}>
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

          <Heading as="h4" size="md" textAlign="left" mb={4}>
            Endereço
          </Heading>
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

          <Flex mt={6} display="flex" justifyContent="flex-end">
            <Button
              type="button"
              colorScheme="red"
              size="md"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              size="md"
              ml={4}
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Box>
    </MainLayout>
  );
}
