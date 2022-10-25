import { Button, Container, Flex, HStack, Link } from '@chakra-ui/react'

export default function Navbar() {
  return (
    <Container
      maxW='full'
      as="header"
      borderBottomWidth="1px"
      paddingX={4}
      paddingY={6}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <HStack>
          <Link href='/'>Home</Link>
          <Link href='/mint'>Mint</Link>
          <Link href='/docs'>API Docs</Link>
        </HStack>

        <Button colorScheme="blue">Connect Wallet</Button>
      </Flex>
    </Container>
  )
}