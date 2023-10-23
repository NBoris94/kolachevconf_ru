'use client'

import {Heading, Stack, useColorModeValue} from '@chakra-ui/react'
import LoginForm from '@/components/pages/auth/LoginForm'
import {Flex} from '@chakra-ui/layout'

const Login = () => {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'} justifyContent="center">
                    <Heading fontSize={'4xl'} textAlign={'center'}>Вход в панель администратора</Heading>
                </Stack>
                <LoginForm />
            </Stack>
        </Flex>
    )
}

export default Login
