import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, VStack, Image as Img, Container } from '@chakra-ui/react'

import { Head } from '@components/index'
import { BrandName } from '@src/constants'
import { AuthImage } from '@assets/images'
import { useNavigate } from 'react-router-dom';

export default function LoginPage () {
    const navigate = useNavigate();

  return (
    <>
        <Head>
            <title>Login | {BrandName}</title>
        </Head>
        <Container maxW='100vw' as="main">
            <Flex minH="100vh" alignItems="center">
                <Box
                    w='150%'
                    display={{ base: 'none', lg: 'block' }} 
                >
                    <Box boxSize={{ lg: 'lg', xl: 'xl' }} mx='auto' >
                        <Img src={AuthImage} alt='authentication' />
                    </Box>
                </Box>
                <Box w={{ base: '100%' }} bg={'pink.50'} h="100vh" borderRadius="xl" p={{ base: '4', md: '8' }} boxShadow="xl">
                    <VStack spacing="5" justify="center" alignItems="stretch" h="full">
                        <Heading as='h1' fontSize="3xl" textAlign="center" color={'pink.600'}> Bem Vindo de Volta! </Heading>
                        <Text textAlign="center" fontSize="md" color="pink.500">Faça login para continuar</Text>
                        <VStack spacing="4" as="form">
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" placeholder="Email" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Senha</FormLabel>
                                <Input type="password" placeholder="*******" />
                            </FormControl>
                            <Button w='full' size="lg" colorScheme='pink' textColor={'white'}>Fazer Login</Button>
                        </VStack>
                        <Text mt='3' fontWeight="medium" textAlign="center" onClick={() => navigate('/registro')}>
                            Você é novo aqui?{' '}
                            <Link href="/registro" color="pink.500">Crie sua conta</Link>
                        </Text>
                    </VStack>
                </Box>
            </Flex>
        </Container>
    </>
  )
}
