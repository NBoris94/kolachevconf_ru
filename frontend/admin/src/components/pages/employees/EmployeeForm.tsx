'use client'

import { FC } from "react"
import { FormikHelpers } from "formik"
import { Card, CardBody, CardFooter, Flex, Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { EmployeeFormProps, EmployeeFormState } from "./Employees.interfaces"
import { IEmployee } from "@/interfaces/employees"
import { INITIAL_FORM_STATE } from "./Employees.constants"
import Link from "next/link"

const EmployeeForm: FC<EmployeeFormProps> = (
    {
        employee,
        isLoading,
        error,
        onSubmit
    }
) => {
    const handleSubmit = (values: EmployeeFormState | IEmployee, actions: FormikHelpers<EmployeeFormState | IEmployee>) => {
        onSubmit(values)
        actions.setSubmitting(false)
    }

    return (
        <Card borderRadius="xl">
            <Formik
                initialValues={employee || INITIAL_FORM_STATE}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <CardBody>
                            <Field name="surname" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Фамилия</FormLabel>
                                        <Input {...field} placeholder="Иванов" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="name" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Имя</FormLabel>
                                        <Input {...field} placeholder="Иван" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="patronymic" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Отчество</FormLabel>
                                        <Input {...field} placeholder="Иванович" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="post" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Должность</FormLabel>
                                        <Input {...field} placeholder="доцент" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                                    href="/admin/employees"
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

export default EmployeeForm
