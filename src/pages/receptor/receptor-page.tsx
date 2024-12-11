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

type Receiver = {
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

export default function ReceptoresPage() {
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [filteredReceivers, setFilteredReceivers] = useState<Receiver[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const fetchReceivers = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get("/users", {
          params: { profile_id: 3 }, // Substitua "3" pelo ID correspondente aos receptores
        });
        setReceivers(response.data.data);
        setFilteredReceivers(response.data.data); // Inicializa os dados filtrados
      } catch (error: any) {
        toast({
          title: "Erro ao carregar receptores",
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

    fetchReceivers();
  }, [toast]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredReceivers(receivers);
      return;
    }

    const filtered = receivers.filter((receiver) => {
      return (
        receiver.name.toLowerCase().includes(query) ||
        receiver.email.toLowerCase().includes(query) ||
        receiver.phone.toLowerCase().includes(query) ||
        receiver.blood_type.toLowerCase().includes(query) ||
        format(new Date(receiver.birth_date), "dd/MM/yyyy").includes(query)
      );
    });

    setFilteredReceivers(filtered);
  };

  const columns: Array<{
    header: string;
    accessor?: keyof Receiver;
    render?: (row: Receiver) => JSX.Element;
  }> = [
    { header: "Nome", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Telefone", accessor: "phone" },
    {
      header: "Gênero",
      render: (row) => (
        <Text>{row.gender === "male" ? "Masculino" : "Feminino"}</Text>
      ),
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
            to={`/receptores/${row.id}`}
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
      <Flex minH="85vh" p={4} direction="column" gap={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Receptores</Text>
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
          <DataTable columns={columns} data={filteredReceivers} />
        )}
      </Flex>
    </MainLayout>
  );
}
