import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import {Button} from '@chakra-ui/button'
import {Box} from '@chakra-ui/layout'
import Link from 'next/link'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import {INITIAL_LOGIN_STATE} from '@/components/pages/auth/Auth.constants'
import {ILogin} from '@/components/pages/auth/Auth.interfaces'
import {useLoginMutation} from '@/redux/services/auth'
import {useRouter} from 'next/navigation'
import {useAppDispatch} from '@/redux/store'
import {setCredentials} from '@/redux/features/authSlice'
import {useState} from 'react'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'

const LoginForm = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [error, setError] = useState<string>('')

    const [
        login,
        {
            isLoading,
        }
    ] = useLoginMutation()

    const handleSubmit = async (values: ILogin, actions: FormikHelpers<ILogin>) => {

        try {
            const loginData = await login(values).unwrap()
            dispatch(setCredentials(loginData))
            actions.setSubmitting(false)
            setError('')
            router.push('/admin/participants')
        } catch (e: any) {
            setError(e?.data?.message as string)
        }
    }

    return (
        <Formik
            initialValues={INITIAL_LOGIN_STATE}
            onSubmit={handleSubmit}
        >
            <Form>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Field name="email" disabled={isLoading}>
                            {({ field, form }: any) => (
                                <FormControl>
                                    <FormLabel>Почта</FormLabel>
                                    <Input {...field} type="email" placeholder='test@example.ru' />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" disabled={isLoading}>
                            {({ field, form }: any) => (
                                <FormControl>
                                    <FormLabel>Пароль</FormLabel>
                                    <Input {...field} type="password"  />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Stack spacing={4}>
                            {error !== '' && <Text color={'red.500'}>{error}</Text>}
                            <Link href={'/auth/reset-password'}>
                                <Text color={'blue.400'}>Забыли пароль?</Text>
                            </Link>
                            <Button
                                type="submit"
                                bg={'blue.400'}
                                color={'white'}
                                isLoading={isLoading}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Войти
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Form>
        </Formik>
    )
}

export default LoginForm
