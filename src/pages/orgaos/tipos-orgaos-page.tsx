import { MainLayout } from "@src/layout/mainLayout";
import {
  Box,
  Flex,
  Text,
  VStack,
  IconButton,
  Button,
  Spinner,
  useToast,
  Tooltip,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IOrgan } from "@src/api/types";
import { axiosInstanceAuthenticated } from "@src/api/api";

export default function TiposOrgaosPage() {
  const [organTypes, setOrganTypes] = useState<IOrgan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const fetchOrganTypes = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get("/organ-types");
        setOrganTypes(response.data.data);
      } catch (error: any) {
        toast({
          title: "Erro ao carregar tipos de órgãos",
          description:
            error.response?.data?.message ||
            "Não foi possível carregar os dados.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrganTypes();
  }, [toast]);

  const deleteOrganType = async (id: number) => {
    try {
      await axiosInstanceAuthenticated.delete(`/organ-types/${id}`);
      setOrganTypes((prev) => prev.filter((type) => type.id !== id));
      toast({
        title: "Tipo de órgão removido",
        description: "O tipo de órgão foi removido com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir tipo de órgão",
        description:
          error.response?.data?.message ||
          "Não foi possível excluir o tipo de órgão.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <MainLayout>
      <Flex minH="85vh" p={4}>
        <Box as="main" flex="1">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Tipos de Órgãos
            </Text>
            <Button as={Link} to="/registrar-orgao" colorScheme="teal">
              Novo Tipo de Órgão
            </Button>
          </Flex>

          {loading ? (
            <Flex justifyContent="center" alignItems="center" minH="50vh">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <Grid
              templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
              gap={4}
            >
              {organTypes.map((organ) => (
                <GridItem
                  key={organ.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  boxShadow="sm"
                >
                  <VStack align="stretch" spacing={2}>
                    <Text fontSize="lg" fontWeight="bold">
                      {organ.name}
                    </Text>
                    <Tooltip label={organ.description}>
                      <Text noOfLines={2} fontSize="sm" color="gray.600">
                        {organ.description}
                      </Text>
                    </Tooltip>
                    <Text fontSize="sm">
                      <b>Preservação:</b>{" "}
                      {organ.default_preservation_time_minutes} min
                    </Text>
                    <Text fontSize="sm">
                      <b>Post-mortem:</b> {organ.is_post_mortem ? "Sim" : "Não"}
                    </Text>
                    <Text fontSize="sm">
                      <b>Compatibilidade:</b>
                      <br />
                      {organ.compatibility_criteria.age_range
                        ? ` Idade: ${organ.compatibility_criteria.age_range[0]}-${organ.compatibility_criteria.age_range[1]}`
                        : " -"}
                      <br />
                      {organ.compatibility_criteria.blood_type
                        ? `Tipos: ${organ.compatibility_criteria.blood_type.join(
                            ", "
                          )}`
                        : ""}
                      <br />
                      {organ.compatibility_criteria.hla_compatibility
                        ? `, HLA`
                        : ""}
                    </Text>
                    <Flex justify="flex-end">
                      <IconButton
                        aria-label={`Excluir ${organ.name}`}
                        icon={<FiTrash />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => deleteOrganType(organ.id)}
                      />
                    </Flex>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          )}
        </Box>
      </Flex>
    </MainLayout>
  );
}
