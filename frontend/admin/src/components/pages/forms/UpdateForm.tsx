'use client'

import { FC } from "react"
import { useRouter } from "next/navigation"
import { Flex, Heading, Button, Text } from "@chakra-ui/react"
import { UpdateFormProps, FormFormState } from "./Forms.interfaces"
import { useGetFormQuery, useUpdateFormMutation } from "@/redux/services/forms"
import { IForm } from "@/interfaces/participants"
import Link from "next/link"
import FormForm from "./FormForm"

const UpdateForm: FC<UpdateFormProps> = (
    {
        id
    }
) => {
    const router = useRouter()
    const { data: form, isLoading : isGetFormLoading, error: getFormError } = useGetFormQuery(id)
    const [ updateForm, { isLoading, error } ] = useUpdateFormMutation()

    const handleSubmit = (form: FormFormState | IForm) => {
        updateForm(form).then(() => {
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
                    Редактирование формы участия
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
            {
                isGetFormLoading
                    ? <Text>Загрузка...</Text>
                    : <FormForm
                        form={form}
                        isLoading={isLoading}
                        error={error}
                        onSubmit={handleSubmit}
                    />
            }
        </>
    )
}

export default UpdateForm
