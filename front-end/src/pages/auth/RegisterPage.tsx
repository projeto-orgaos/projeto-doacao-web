import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, VStack, Image as Img, Container, Select, Textarea } from '@chakra-ui/react'

import { Head } from '@components/index'
import { BrandName } from '@src/constants'
import { AuthImage } from '@assets/images'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Registro | {BrandName}</title>
      </Head>
      <Container maxW='100vw' as="main">
        <Flex minH="100vh" alignItems="center">
          <Box
            w='150%'
            display={{ base: 'none', lg: 'block' }}
          >
            <Box boxSize={{ lg: 'lg', xl: 'xl' }} mx='auto'>
              <Img src={AuthImage} alt='authentication' />
            </Box>
          </Box>
          <Box w={{ base: '100%' }} bg={'green.50'} h="100vh" borderRadius="xl" p={{ base: '4', md: '8' }} boxShadow="xl">
            <VStack spacing="5" justify="center" alignItems="stretch" h="full">
              <Heading as='h1' fontSize="3xl" textAlign="center" color={'green.600'}>Cadastro de Doação de Órgãos</Heading>
              <Text textAlign="center" fontSize="md" color="green.500">Preencha os campos abaixo para se registrar</Text>
              <VStack spacing="4" as="form">
                <FormControl isRequired>
                  <FormLabel>Nome Completo</FormLabel>
                  <Input type="text" placeholder="Digite seu nome completo" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>CPF</FormLabel>
                  <Input type="text" placeholder="Digite seu CPF" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Idade</FormLabel>
                  <Input type="number" placeholder="Digite sua idade" />
                </FormControl>
                <FormControl>
                  <FormLabel>Órgãos que deseja doar</FormLabel>
                  <Textarea placeholder="Exemplo: coração, rins, fígado, etc." />
                </FormControl>
                <FormControl>
                  <FormLabel>Tipo Sanguíneo</FormLabel>
                  <Select placeholder="Selecione seu tipo sanguíneo">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Select>
                </FormControl>
                <Button w='full' size="lg" colorScheme='green' textColor={'white'}>Registrar</Button>
              </VStack>
              <Text mt='3' fontWeight="medium" textAlign="center">
                Já possui cadastro?{' '}
                <Link href='/login' color="green.500">Faça login</Link>
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </>
  )
}
