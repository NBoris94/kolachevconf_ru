'use client'

import { useRouter } from 'next/navigation'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { useAddFormMutation } from '@/redux/services/forms'
import { FormFormState } from './Forms.interfaces'
import { IForm } from '@/interfaces/participants'
import Link from 'next/link'
import FormForm from './FormForm'

const CreateForm = () => {
    const router = useRouter()
    const [ addForm, { isLoading, error } ] = useAddFormMutation()

    const handleSubmit = (form: FormFormState | IForm) => {
        addForm(form).then(() => {
            if (!error) {
                router.push('/admin/forms')
            }
        })
    }

    return (
        <>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p="5"
                gap="4"
                mb="4"
            >
                <Heading as='h1' size='xl'>
                    Создать форму участия
                </Heading>
                <Button
                    as={Link}
                    href="/admin/forms"
                    colorScheme='teal'
                    borderRadius="full"
                >
                    Вернуться назад
                </Button>
            </Flex>
            <FormForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}

export default CreateForm
