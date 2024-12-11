import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  Container,
  Select,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Head } from "@components/index";
import { BrandName } from "@src/constants";
import { axiosInstanceAuthenticated } from "@src/api/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    birth_date: "",
    gender: "",
    mother_name: "",
    email: "",
    password: "",
    profile_id: 1, // Padrão para doador
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
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
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
      await axiosInstanceAuthenticated.post("/auth/register", formData);
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você pode fazer login agora.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description:
          error.response?.data?.message ||
          "Erro ao tentar registrar o usuário.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Registro | {BrandName}</title>
      </Head>
      <Container maxW="100vw" as="main" p={4}>
        <Flex minH="85vh" alignItems="center" justifyContent="center">
          <Box
            bg="green.50"
            w="full"
            maxW="1000px"
            p={8}
            borderRadius="xl"
            boxShadow="lg"
          >
            <Heading
              as="h1"
              fontSize="3xl"
              textAlign="center"
              color="green.600"
              mb={4}
            >
              Cadastro de Doação de Órgãos
            </Heading>
            <Text textAlign="center" fontSize="md" color="green.500" mb={6}>
              Preencha os campos abaixo para se registrar
            </Text>
            <form onSubmit={handleSubmit}>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormControl isRequired>
                  <FormLabel>Nome Completo</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    type="text"
                    name="cpf"
                    placeholder="Digite seu CPF"
                    value={formData.cpf}
                    onChange={handleChange}
                    maxLength={11}
                    minLength={11}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Gênero</FormLabel>
                  <Select
                    name="gender"
                    placeholder="Selecione"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Nome da Mãe</FormLabel>
                  <Input
                    type="text"
                    name="mother_name"
                    placeholder="Digite o nome da sua mãe"
                    value={formData.mother_name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Tipo Sanguíneo</FormLabel>
                  <Select
                    name="blood_type"
                    placeholder="Selecione seu tipo sanguíneo"
                    value={formData.blood_type}
                    onChange={handleChange}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Select>
                </FormControl>
              </Grid>
              <Heading as="h4" fontSize="lg" mt={8}>
                Endereço
              </Heading>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={4}
                mt={4}
              >
                <FormControl isRequired>
                  <FormLabel>Rua</FormLabel>
                  <Input
                    type="text"
                    name="address.street"
                    placeholder="Digite a rua"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Número</FormLabel>
                  <Input
                    type="text"
                    name="address.number"
                    placeholder="Digite o número"
                    value={formData.address.number}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Complemento</FormLabel>
                  <Input
                    type="text"
                    name="address.complement"
                    placeholder="Digite o complemento"
                    value={formData.address.complement}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Bairro</FormLabel>
                  <Input
                    type="text"
                    name="address.neighborhood"
                    placeholder="Digite o bairro"
                    value={formData.address.neighborhood}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Cidade</FormLabel>
                  <Input
                    type="text"
                    name="address.city"
                    placeholder="Digite a cidade"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Estado</FormLabel>
                  <Input
                    type="text"
                    name="address.state"
                    placeholder="Digite o estado"
                    value={formData.address.state}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>CEP</FormLabel>
                  <Input
                    type="text"
                    name="address.zip_code"
                    placeholder="Digite o CEP"
                    value={formData.address.zip_code}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Button
                type="submit"
                w="full"
                size="lg"
                colorScheme="green"
                mt={8}
              >
                Registrar
              </Button>
            </form>
            <Text mt={4} fontWeight="medium" textAlign="center">
              Já possui cadastro?{" "}
              <Link href="/login" color="green.500">
                Faça login
              </Link>
            </Text>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
