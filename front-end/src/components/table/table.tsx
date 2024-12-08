import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

type Column<T> = {
  header: string; // Nome exibido no cabeçalho
  accessor?: keyof T; // Propriedade da linha que será exibida (opcional para colunas customizadas)
  render?: (row: T) => React.ReactNode; // Função para renderizar conteúdo customizado
};

type DataTableProps<T> = {
  columns: Column<T>[]; // Array de colunas
  data: T[]; // Array de dados genéricos
};

export const DataTable = <T,>({ columns, data }: DataTableProps<T>) => {
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
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={`${rowIndex}-${colIndex}`}>
                  {column.accessor
                    ? // Verifica e formata a data
                      (formatDate(row[column.accessor]) as React.ReactNode)
                    : column.render?.(row)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
