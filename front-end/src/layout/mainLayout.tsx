import { Box, List, useColorModeValue } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Navbar } from '@src/components/nav/navbar';
import { listItems } from '@src/components/nav/navItens';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function MainLayout({ children }: { children: ReactNode }) {
  const { getButtonProps, isOpen } = useDisclosure()
  const buttonProps = { ...getButtonProps(), 'aria-label': 'Toggle Navigation' }

  return (
    <>
      <Navbar buttonProps={buttonProps} />
      {/* 
        pt="16" para empurrar o conteúdo para baixo da navbar fixa.
        Removeremos o HStack align e spacing para não forçar layout.
      */}
      <Box pt="16" display="flex" flexDir="row" width="full" minH="100vh">
        <Box
          as="aside"
          minH="90vh"
          w={isOpen ? 72 : 12}
          borderRight="2px"
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          transition="width 0.25s ease"
        >
          <List spacing={0} p="0.5">
            {listItems.map((item: { icon: React.ElementType; text?: string, path: string }, index: number) => (
              <ListElement key={index} icon={item.icon} text={isOpen && item.text ? item.text : '' } path={item.path} />
            ))}
          </List>
        </Box>
        {/* Remover align="center" e justify="center" permite o conteúdo iniciar no topo à esquerda */}
        <Box as="main" flex="1" bg={useColorModeValue('gray.50', 'gray.900')} p="4">
          {children}
        </Box>
      </Box>
    </>
  )
}

interface ListElementProps {
  icon: React.ElementType;
  text: string;
  path: string;
}

const ListElement = ({ icon, text, path}: ListElementProps) => {
  return (
    <Link to={path}>
    <Box
      as="li"
      display="flex"
      alignItems="center"
      h="10"
      pl="2.5"
      cursor="pointer"
      _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
      rounded="md"
    >
      <Box as={icon} boxSize={5} mr={text ? 2 : 0}/>
      {text}
    </Box>
    </Link>
  )
}