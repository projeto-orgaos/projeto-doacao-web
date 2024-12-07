import { IconButton, useColorModeValue, Box, HStack, Text } from '@chakra-ui/react'
import { BiMenu } from 'react-icons/bi'
import { BrandName } from '@src/constants'
import { IconButtonProps } from '@chakra-ui/react'

export function Navbar({ buttonProps }: { buttonProps: IconButtonProps }) {
  return (
    <Box
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      h="16"
      py="2.5"
      pr="2.5"
      px="4"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="sm"
    >
      <HStack direction="row" spacing={2}>
        <IconButton
          {...buttonProps}
          _active='none'
          _focus='none'
          _hover='none'
          fontSize="18px"
          variant='ghost'
          icon={<BiMenu />}
          aria-label='open menu'
        />
        <Text as='h1' fontSize="md">{BrandName}</Text>
      </HStack>
    </Box>
  )
}
