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
  Switch,
  useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select"; // Certifique-se de instalar este pacote
import { MainLayout } from "@src/layout/mainLayout";
import { useNavigate } from "react-router-dom";
import { axiosInstanceAuthenticated } from "@src/api/api";

export default function RegisterOrgaoPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    default_preservation_time_minutes: "",
    is_post_mortem: false,
    compatibility_criteria: {
      age_range: { min: "", max: "" },
      blood_type: [] as string[],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompatibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: "min" | "max"
  ) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      compatibility_criteria: {
        ...prevData.compatibility_criteria,
        age_range: {
          ...prevData.compatibility_criteria.age_range,
          [key]: value,
        },
      },
    }));
  };

  const handleBloodTypeChange = (selectedOptions: Array<{ value: string }>) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      compatibility_criteria: {
        ...prevData.compatibility_criteria,
        blood_type: selectedValues,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      await axiosInstanceAuthenticated.post("/organ-types", formData);
      toast({
        title: "Tipo de órgão registrado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/tipos-orgaos");
    } catch (error: any) {
      toast({
        title: "Erro ao registrar tipo de órgão",
        description: error.response?.data?.message || "Erro desconhecido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
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
        maxWidth="800px"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Cadastro de Tipo de Órgão
        </Heading>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(12, 1fr)" gap={4} mb={6}>
            {/* Nome */}
            <FormControl gridColumn="span 6">
              <FormLabel>Nome do Órgão</FormLabel>
              <Input
                placeholder="Coração, Pulmão, etc."
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Descrição */}
            <FormControl gridColumn="span 6">
              <FormLabel>Descrição</FormLabel>
              <Input
                placeholder="Descrição detalhada"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Tempo de Preservação */}
            <FormControl gridColumn="span 6">
              <FormLabel>Tempo de Preservação (minutos)</FormLabel>
              <Input
                type="number"
                placeholder="Ex: 240"
                name="default_preservation_time_minutes"
                value={formData.default_preservation_time_minutes}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Post-mortem */}
            <FormControl gridColumn="span 6" display="flex" alignItems="center">
              <FormLabel mb={0}>Post-mortem?</FormLabel>
              <Switch
                isChecked={formData.is_post_mortem}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    is_post_mortem: e.target.checked,
                  }))
                }
              />
            </FormControl>

            {/* Critérios de Compatibilidade */}
            <FormControl gridColumn="span 6">
              <FormLabel>Faixa Etária</FormLabel>
              <Flex>
                <Input
                  placeholder="Mínimo"
                  value={formData.compatibility_criteria.age_range.min}
                  onChange={(e) => handleCompatibilityChange(e, "min")}
                  type="number"
                  mr={2}
                />
                <Input
                  placeholder="Máximo"
                  value={formData.compatibility_criteria.age_range.max}
                  onChange={(e) => handleCompatibilityChange(e, "max")}
                  type="number"
                />
              </Flex>
            </FormControl>

            {/* Tipos Sanguíneos */}
            <FormControl gridColumn="span 12">
              <FormLabel>Tipos Sanguíneos Compatíveis</FormLabel>
              <Select
                isMulti
                tagColorScheme="purple"
                options={[
                  { label: "A+", value: "A+", colorScheme: "blue" },
                  { label: "A-", value: "A-", colorScheme: "red" },
                  { label: "B+", value: "B+", colorScheme: "green" },
                  { label: "B-", value: "B-", colorScheme: "yellow" },
                  { label: "O+", value: "O+", colorScheme: "cyan" },
                  { label: "O-", value: "O-", colorScheme: "orange" },
                  { label: "AB+", value: "AB+", colorScheme: "purple" },
                  { label: "AB-", value: "AB-", colorScheme: "pink" },
                ]}
                onChange={(selectedOptions) =>
                  //@ts-expect-error selectedOptions é um array de objetos
                  handleBloodTypeChange(selectedOptions as Array<{ value: string }>)
                }
              />
            </FormControl>
          </Grid>

          {/* Botões */}
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
