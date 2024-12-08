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
  Select,
} from "@chakra-ui/react";
import { MainLayout } from "@src/layout/mainLayout";
import { useNavigate } from "react-router-dom";

export default function RegisterOrgaoPage() {
  const navigate = useNavigate();

  const [donors, setDonor] = useState<{ id: string; name: string }[]>([]);

  const [hospitals, setHospitals] = useState<{ id: string; name: string }[]>([]);

  const [formData, setFormData] = useState({
    organ_type: "",
    expiration_date: "",
    distance_limit: "",
    hospital_id: "",
    donor_id: "",
  });

  useEffect(() => {
    // Simulação de uma API para obter os hospitais
    const fetchHospitals = async () => {
      const hospitalData = [
        { id: "1", name: "Hospital A" },
        { id: "2", name: "Hospital B" },
        { id: "3", name: "Hospital C" },
      ];
      setHospitals(hospitalData);
    };
    fetchHospitals();
  }, []);

  useEffect(() => {
    // Simulação de uma API para obter os doadores
    const fetchDonors = async () => {
      const donorData = [
        { id: "1", name: "Doador A" },
        { id: "2", name: "Doador B" },
        { id: "3", name: "Doador C" },
      ];
      setDonor(donorData);
    };
    fetchDonors();
  }, []);

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
    navigate("/orgaos");
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

             {/* Seleção de Hospital */}
            <FormControl gridColumn="span 4">
              <FormLabel>Hospital</FormLabel>
              <Select
                placeholder="Selecione um hospital"
                name="hospital_id"
                value={formData.hospital_id}
                onChange={handleInputChange}
              >
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </Select>
            </FormControl>
             {/* Seleção de Doadores */}
            <FormControl gridColumn="span 4">
              <FormLabel>Doadores</FormLabel>
              <Select
                placeholder="Selecione um Doador"
                name="donor_id"
                value={formData.donor_id}
                onChange={handleInputChange}
              >
                {donors.map((donor) => (
                  <option key={donor.id} value={donor.id}>
                    {donor.name}
                  </option>
                ))}
              </Select>
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
