import {
  Box,
  Button,
  List,
  useColorModeValue,
  Tooltip
} from "@chakra-ui/react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Navbar } from "@src/components/nav/navbar";
import { listItems } from "@src/components/nav/navItens";
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosExit } from "react-icons/io";

export function MainLayout({ children }: { children: ReactNode }) {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("user_data"); // Limpa os dados de autenticação
      navigate("/login"); // Redireciona para a página de login
    }, 1000);
  };

  return (
    <>
      <Navbar
        buttonProps={{ onClick: onToggle, "aria-label": "Toggle Navigation" }}
      />
      <Box pt="16" display="flex" flexDir="row" width="full" minH="100vh">
        <Box
          as="aside"
          minH="90vh"
          w={isOpen ? 72 : 12}
          borderRight="2px"
          borderColor={useColorModeValue("gray.200", "gray.900")}
          transition="width 0.25s ease"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <List spacing={0} p="0.5">
            {listItems.map((item, index) => (
              <ListElement
                key={index}
                icon={item.icon}
                text={isOpen && item.text ? item.text : ""}
                path={item.path}
              />
            ))}
          </List>
          <Tooltip label="Sair" placement="right" hasArrow>
            <Button
              onClick={handleLogout}
              isLoading={isLoggingOut}
              loadingText="Saindo..."
              leftIcon={!isLoggingOut ? <IoIosExit /> : undefined}
              colorScheme="red"
              variant="solid"
              size="sm"
              mx={"2"}
              mb={"4"}
            >
              {isOpen && !isLoggingOut ? "Sair" : isLoggingOut && "Saindo..."}
            </Button>
          </Tooltip>
        </Box>
        <Box
          as="main"
          flex="1"
          bg={useColorModeValue("gray.50", "gray.900")}
          p="4"
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

interface ListElementProps {
  icon: React.ElementType;
  text: string;
  path: string;
}

const ListElement = ({ icon, text, path }: ListElementProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  const bgColor = useColorModeValue("blue.100", "blue.700");
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("blue.500", "blue.300");
  const iconColor = useColorModeValue("blue.600", "blue.200");

  return (
    <Link to={path}>
      <Box
        as="li"
        display="flex"
        alignItems="center"
        h="10"
        pl="2.5"
        cursor="pointer"
        bg={isActive ? bgColor : "transparent"}
        _hover={{ bg: hoverBgColor }}
        rounded="md"
        border={isActive ? "1px solid" : "none"}
        borderColor={isActive ? borderColor : "transparent"}
      >
        <Box
          as={icon}
          boxSize={5}
          mr={text ? 2 : 0}
          color={isActive ? iconColor : "inherit"}
        />
        {text}
      </Box>
    </Link>
  );
};
