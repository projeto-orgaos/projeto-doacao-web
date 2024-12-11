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
  VStack,
  Image as Img,
  Container,
  useToast,
} from "@chakra-ui/react";
import { Head } from "@components/index";
import { BrandName } from "@src/constants";
import { AuthImage } from "@assets/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstanceUnauthenticated } from "@src/api/api";
import { LoginResponse } from "@src/api/types";

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password123");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validações de formulário
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Erro",
        description: "Por favor, insira um e-mail válido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstanceUnauthenticated.post<LoginResponse>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const { user } = response.data;
      console.log(user);
      console.log(response.data);
      console.log(response.data.access_token);
      // Armazenar dados no localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_data", JSON.stringify(user));

      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redireciona após login bem-sucedido
      navigate("/home");
    } catch (error: any) {
      toast({
        title: "Erro",
        description:
          error.response?.data?.message ||
          "Falha ao realizar login. Tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | {BrandName}</title>
      </Head>
      <Container maxW="100vw" as="main">
        <Flex minH="85vh" alignItems="center">
          <Box w="150%" display={{ base: "none", lg: "block" }}>
            <Box boxSize={{ lg: "lg", xl: "xl" }} mx="auto">
              <Img src={AuthImage} alt="authentication" />
            </Box>
          </Box>
          <Box
            w={{ base: "100%" }}
            bg="green.50"
            h="85vh"
            borderRadius="xl"
            p={{ base: "4", md: "8" }}
            boxShadow="xl"
          >
            <VStack spacing="5" justify="center" alignItems="stretch" h="full">
              <Heading
                as="h1"
                fontSize="3xl"
                textAlign="center"
                color="green.600"
              >
                Bem Vindo de Volta!
              </Heading>
              <Text textAlign="center" fontSize="md" color="green.500">
                Faça login para continuar
              </Text>
              <VStack spacing="4" as="form" onSubmit={handleLogin}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  w="full"
                  size="lg"
                  colorScheme="green"
                  textColor="white"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Fazer Login
                </Button>
              </VStack>
              <Text mt="3" fontWeight="medium" textAlign="center">
                Você é novo aqui?{" "}
                <Link href="/registro" color="green.500">
                  Crie sua conta
                </Link>
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
