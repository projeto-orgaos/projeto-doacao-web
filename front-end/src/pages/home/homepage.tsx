import { Head } from "@src/components";
import { MainLayout } from "@src/layout/mainLayout";
import { BrandName } from "@src/constants";
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  useColorModeValue
} from "@chakra-ui/react";

//-----------------------------------------------------------------------------------

export default function Home() {
  // Defina algumas cores padrão
  const bgMain = useColorModeValue("white", "gray.800");

  return (
    <MainLayout>
      <Head>
        <title>Home | {BrandName}</title>
      </Head>

      <Flex minH="100vh">
        {/* CONTEÚDO PRINCIPAL */}
        <Box as="main" flex="1" p={4} bg={bgMain}>
          <Text fontSize="2xl" mb={4}>Dashboard</Text>

          <Grid templateColumns={["1fr", "repeat(3, 1fr)"]} gap={4}>
            {/* Card 1 */}
            <GridItem
              bg={useColorModeValue("gray.50", "gray.700")}
              p={4}
              borderRadius="md"
              boxShadow="md"
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>Hospitais Cadastrados</Text>
              <Text fontSize="sm" color="gray.500">Total: 150</Text>
            </GridItem>

            {/* Card 2 */}
            <GridItem
              bg={useColorModeValue("gray.50", "gray.700")}
              p={4}
              borderRadius="md"
              boxShadow="md"
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>Usuários</Text>
              <Text fontSize="sm" color="gray.500">Total: 25</Text>
            </GridItem>

            {/* Card 3 */}
            <GridItem
              bg={useColorModeValue("gray.50", "gray.700")}
              p={4}
              borderRadius="md"
              boxShadow="md"
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>Orgão Cadastrados</Text>
              <Text fontSize="sm" color="gray.500">Total: 5</Text>
            </GridItem>
          </Grid>

          {/* Você pode adicionar mais seções, gráficos, tabelas... */}
          <Box mt={8}>
            <Text fontSize="xl" mb={4}>Gráficos e Estatísticas</Text>
            
          </Box>
        </Box>
      </Flex>
    </MainLayout>
  );
}
