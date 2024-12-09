import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  CheckboxGroup,
  Checkbox,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { axiosInstanceAuthenticated } from "@src/api/api";

interface OrganType {
  id: number;
  name: string;
}

interface OrganSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number; // ID do doador ou receptor
  userType: "donor" | "recipient"; // Para diferenciar se é doador ou receptor
}

const OrganSelectionModal: React.FC<OrganSelectionModalProps> = ({
  isOpen,
  onClose,
  userId,
  userType,
}) => {
  const [organTypes, setOrganTypes] = useState<OrganType[]>([]);
  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchOrganTypes = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get("/organ-types");
        setOrganTypes(response.data.data);
      } catch (error) {
        toast({
          title: "Erro ao carregar tipos de órgãos",
          description: "Não foi possível carregar os dados.",
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

  const handleSave = async () => {
    try {
      // Converte os IDs selecionados de string para número
      const organ_ids = selectedOrgans.map((id) => parseInt(id, 10));
      await axiosInstanceAuthenticated.put(`/users/update-organs/${userId}`, {
        organ_ids,
      });
      toast({
        title: "Órgãos atualizados",
        description: "Os órgãos foram atualizados com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao salvar órgãos",
        description: "Não foi possível atualizar os órgãos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCheckboxChange = (values: string[]) => {
    setSelectedOrgans(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {`Adicionar Órgãos para ${userType === "donor" ? "Doação" : "Recepção"}`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <CheckboxGroup value={selectedOrgans} onChange={handleCheckboxChange}>
              <VStack align="start">
                {organTypes.map((organ) => (
                  <Checkbox key={organ.id} value={organ.id.toString()}>
                    {organ.name}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrganSelectionModal;
