import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react"

export default function Footer() {
  return (
    <Box as='footer' bg={useColorModeValue('gray.50', 'gray.900')} py="6">
        <VStack>
            <Text>©2024 LifeLoon, All rights reserved.</Text>
        </VStack>
    </Box>
  )
}
