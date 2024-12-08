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
} from "@chakra-ui/react";
import { MainLayout } from "@src/layout/mainLayout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditHospitalPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: "",
    registration_number: "",
    phone: "",
    cnpjf: "",
    art: "",
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

  useEffect(() => {
    // Simulação de API para buscar hospital
    const fetchHospitalData = async () => {
      const hospitalData = {
        name: "Hospital São Paulo",
        registration_number: "123456",
        phone: "123-456-7890",
        cnpjf: "12345678910111",
        art: "987654321",
        email: "sao.paulo@example.com",
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
      setFormData(hospitalData);
    };

    if (id) fetchHospitalData();
  }, [id]);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Editando hospital com ID: ${id}`, formData);
    // Enviar os dados para o backend
  };

  const handleCancel = () => {
    navigate("/hospitais");
  };

  return (
    <MainLayout>
      <Box
        mx="auto"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        position="relative"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          {id ? "Editar Hospital" : "Registrar Hospital"}
        </Heading>
        <form onSubmit={handleSubmit}>
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap={4}
          mb={6}
        >
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

            <FormControl gridColumn="span 4">
              <FormLabel>Telefone</FormLabel>
              <Input
                placeholder="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 4">
              <FormLabel>CNPJ/F</FormLabel>
              <Input
                placeholder="CNPJ/F"
                name="cnpjf"
                value={formData.cnpjf}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 4">
              <FormLabel>ART</FormLabel>
              <Input
                placeholder="ART"
                name="art"
                value={formData.art}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 12">
              <FormLabel>Email</FormLabel>
              <Input
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
            <FormControl gridColumn="span 8">
              <FormLabel>Rua</FormLabel>
              <Input
                placeholder="Rua"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 2">
              <FormLabel>Número</FormLabel>
              <Input
                placeholder="Número"
                name="address.number"
                value={formData.address.number}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl gridColumn="span 2">
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

          <Flex mt={6} display="flex" justifyContent="flex-end">
            <Button type="button" colorScheme="red" size="sm" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="teal" size="sm" ml={4}>
              {id ? "Salvar" : "Registrar"}
            </Button>
          </Flex>
        </form>
      </Box>
    </MainLayout>
  );
}
