import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";

type Column<T> = {
  header: string; // Nome exibido no cabeçalho
  accessor?: keyof T; // Propriedade da linha que será exibida (opcional para colunas customizadas)
  render?: (row: T) => React.ReactNode; // Função para renderizar conteúdo customizado
};

type DataTableProps<T> = {
  columns: Column<T>[]; // Array de colunas
  data: T[]; // Array de dados genéricos
  headerText?: string; // Texto opcional para o cabeçalho
};

export const DataTable = <T,>({
  columns,
  data,
  headerText,
}: DataTableProps<T>) => {
  // Função para verificar se um valor é uma data válida e formatá-la
  const formatDate = (value: unknown): string | unknown => {
    if (value instanceof Date) {
      return value.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
    return value;
  };

  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      overflowX="auto"
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            {headerText && (
              <Tr>
                <Th
                  colSpan={columns.length}
                  bg="teal.500"
                  color="white"
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  py={4}
                >
                  {headerText}
                </Th>
              </Tr>
            )}
            <Tr bg="gray.100">
              {columns.map((column, index) => (
                <Th key={index} textTransform="uppercase" fontSize="sm">
                  {column.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, rowIndex) => (
              <Tr key={rowIndex} borderBottom="1px solid" borderColor="gray.200">
                {columns.map((column, colIndex) => (
                  <Td key={`${rowIndex}-${colIndex}`} py={2}>
                    {column.accessor
                      ? (formatDate(row[column.accessor]) as React.ReactNode)
                      : column.render?.(row)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
