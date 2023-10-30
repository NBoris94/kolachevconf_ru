'use client'

import { FC } from "react"
import { FormikHelpers } from "formik"
import { Card, CardBody, CardFooter, Flex, Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { FormFormProps, FormFormState } from "./Forms.interfaces"
import { IForm } from "@/interfaces/participants"
import { INITIAL_FORM_STATE } from "./Forms.constants"
import Link from "next/link"

const FormForm: FC<FormFormProps> = (
    {
        form,
        isLoading,
        error,
        onSubmit
    }
) => {
    const handleSubmit = (values: FormFormState | IForm, actions: FormikHelpers<FormFormState | IForm>) => {
        onSubmit(values)
        actions.setSubmitting(false)
    }

    return (
        <Card borderRadius="xl">
            <Formik
                initialValues={form || INITIAL_FORM_STATE}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <CardBody>
                            <Field name="name" disabled={isLoading}>
                                {({ field, form: formAction }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Название</FormLabel>
                                        <Input {...field} placeholder="Очная" />
                                        <FormErrorMessage>{formAction.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </CardBody>
                        <CardFooter>
                            <Flex alignItems="center" gap="4">
                                <Button
                                    colorScheme="teal"
                                    borderRadius="full"
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText="Отправка"
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    as={Link}
                                    href="/admin/forms"
                                    borderRadius="full"
                                >
                                    Отмена
                                </Button>
                            </Flex>
                        </CardFooter>
                    </Form>
                )}
            </Formik>
        </Card>
    )
}

export default FormForm
