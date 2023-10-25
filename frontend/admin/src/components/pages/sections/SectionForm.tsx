'use client'

import { FC } from "react"
import { FormikHelpers } from "formik"
import { Card, CardBody, CardFooter, Flex, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, Checkbox } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { SectionFormProps, SectionFormState } from "./Sections.interfaces"
import { ISection } from "@/interfaces/participants"
import { INITIAL_FORM_STATE } from "./Sections.constants"
import { useGetEmployeesQuery } from "@/redux/services/employees"
import Link from "next/link"

const SectionForm: FC<SectionFormProps> = (
    {
        section,
        isLoading,
        error,
        onSubmit
    }
) => {
    const { data: employees, isLoading: isEmployeesLoading, error: employeesError } = useGetEmployeesQuery()

    const handleSubmit = (values: SectionFormState, actions: FormikHelpers<SectionFormState>) => {
        onSubmit({ ...values, employeeIds: values.employeeIds.map((id) => Number(id)) })
        actions.setSubmitting(false)
    }

    return (
        <Card borderRadius="xl">
            <Formik
                initialValues={
                    section ? { id: section.id, name: section.name, employeeIds: section.employees.map((e) => e.id) } : INITIAL_FORM_STATE
                }
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <CardBody>
                            <Field name="name" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Название Секции</FormLabel>
                                        <Input {...field} placeholder="Секция №1. Информатика, вычислительная техника и управление" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            {isEmployeesLoading
                                ? (
                                    <Text>Загрузка сотрудников...</Text>
                                )
                                : (
                                    <>
                                        <FormLabel>Сотрудники</FormLabel>
                                        <Flex
                                            direction="column"
                                            gap="1"
                                        >
                                            {employees && employees.map((employee) => (
                                                <Field
                                                    key={employee.id}
                                                    type="checkbox"
                                                    name="employeeIds"
                                                    value={employee.id}
                                                    disabled={isLoading}
                                                >
                                                    {({ field, form }: any) => (
                                                        <FormControl mb="2">
                                                            <Checkbox
                                                                {...field}
                                                                defaultChecked={section?.employees.map((e) => e.id).includes(employee.id)}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        form.setFieldValue("employeeIds", [...form.values.employeeIds, employee.id])
                                                                    } else {
                                                                        form.setFieldValue("employeeIds", form.values.employeeIds.filter((id: number) => id !== employee.id))
                                                                    }
                                                                }}
                                                            >
                                                                {employee.surname} {employee.name} {employee.patronymic}, {employee.post}
                                                            </Checkbox>
                                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            ))}
                                        </Flex>
                                    </>
                                )
                            }
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
                                    href="/admin/sections"
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

export default SectionForm
