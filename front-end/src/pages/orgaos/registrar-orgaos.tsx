import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function RegisterOrgaoPage() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    organ_type: "",
    expiration_date: "",
    distance_limit: "",
    hospital_id: "",
    donor_id: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    // Enviar os dados para o backend
  };

  const handleCancel = () => {
    navigate("/tipos-orgaos");
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
          Cadastro de Órgãos
        </Heading>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(12, 1fr)" gap={4} mb={6}>
            {/* Tipo de Órgão */}
            <FormControl gridColumn="span 4">
              <FormLabel>Tipo de Órgão</FormLabel>
              <Input
                placeholder="Coração, Pulmão, etc."
                name="organ_type"
                value={formData.organ_type}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Limite de Distância */}
            <FormControl gridColumn="span 4">
              <FormLabel>Limite de Distância (km)</FormLabel>
              <Input
                type="number"
                placeholder="Limite de Distância"
                name="distance_limit"
                value={formData.distance_limit}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Data de Expiração */}
            <FormControl gridColumn="span 4">
              <FormLabel>Data de Expiração</FormLabel>
              <Input
                type="date"
                name="expiration_date"
                value={formData.expiration_date}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>


          {/* Botões */}
          <Flex mt={6} justifyContent="flex-end">
            <Button
              type="button"
              colorScheme="red"
              size="sm"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" colorScheme="teal" size="sm" ml={4}>
              Registrar
            </Button>
          </Flex>
        </form>
      </Box>
    </MainLayout>
  );
}
