import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  HStack,
  IconButton,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { FiSearch, FiEye } from "react-icons/fi";
import { DataTable } from "@src/components/table/table";
import { Link } from "react-router-dom";
import { axiosInstanceAuthenticated } from "@src/api/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MainLayout } from "@src/layout/mainLayout";

type Donor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  blood_type: string;
  birth_date: string;
  profile: {
    id: number;
    description: string;
  };
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  };
};

export default function DoadoresPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get("/users", {
          params: { profile_id: 2 }, // ID do perfil de doadores
        });
        setDonors(response.data.data);
        setFilteredDonors(response.data.data); // Inicializa os dados filtrados
      } catch (error: any) {
        toast({
          title: "Erro ao carregar doadores",
          description: error.response?.data?.message || "Não foi possível carregar os dados.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [toast]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredDonors(donors);
      return;
    }

    const filtered = donors.filter((donor) => {
      return (
        donor.name.toLowerCase().includes(query) ||
        donor.email.toLowerCase().includes(query) ||
        donor.phone.toLowerCase().includes(query) ||
        donor.blood_type.toLowerCase().includes(query) ||
        format(new Date(donor.birth_date), "dd/MM/yyyy").includes(query)
      );
    });

    setFilteredDonors(filtered);
  };

  const columns: Array<{ header: string; accessor?: keyof Donor; render?: (row: Donor) => JSX.Element }> = [
    { header: "Nome", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Telefone", accessor: "phone" },
    {
      header: "Gênero",
      render: (row) => <Text>{row.gender === "male" ? "Masculino" : "Feminino"}</Text>,
    },
    { header: "Tipo Sanguíneo", accessor: "blood_type" },
    {
      header: "Data de Nascimento",
      render: (row) => (
        <Text>
          {format(new Date(row.birth_date), "dd/MM/yyyy", { locale: ptBR })}
        </Text>
      ),
    },
    {
      header: "Ações",
      render: (row) => (
        <HStack>
          <IconButton
            as={Link}
            to={`/doadores/${row.id}`}
            aria-label={`Detalhes ${row.name}`}
            icon={<FiEye />}
            colorScheme="teal"
            size="sm"
          />
        </HStack>
      ),
    },
  ];

  return (
    <MainLayout>
      <Flex minH="100vh" p={4} direction="column" gap={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Doadores</Text>
        </Flex>

        <InputGroup maxW="400px" mb={4}>
          <InputLeftElement pointerEvents="none" children={<FiSearch />} />
          <Input
            type="text"
            placeholder="Pesquisar por nome, email, telefone..."
            value={search}
            onChange={handleSearch}
          />
        </InputGroup>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" minH="50vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <DataTable columns={columns} data={filteredDonors} />
        )}
      </Flex>
    </MainLayout>
  );
}
