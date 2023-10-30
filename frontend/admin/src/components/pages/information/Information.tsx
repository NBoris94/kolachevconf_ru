'use client'

import { Heading, Text, Card, CardBody, CardFooter, Flex, Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea, useDisclosure } from "@chakra-ui/react"
import { FormikHelpers, Field, Form, Formik } from "formik"
import { useGetInformationQuery, useUpdateInformationMutation } from "@/redux/services/information"
import { INITIAL_FORM_STATE } from "./Information.constants"
import { IInformation } from "@/interfaces/information"
import RichText from "@/components/richText/RichText"
import SuccessAlert from "@/components/alerts/SuccessAlert"

const Information = () => {
    const { data: information, isLoading, error } = useGetInformationQuery()
    const [ updateInformation, { isLoading: isLoadingUpdate, error: updateError } ] = useUpdateInformationMutation()
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })

    const handleSubmit = (values: Partial<IInformation>, actions: FormikHelpers<any>) => {
        updateInformation(values).then(() => {
            if (!updateError) {
                onOpen()
                actions.setSubmitting(false)
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        })
    }

    return (
        <>
            <SuccessAlert
                isOpen={isOpen}
                title="Информация обновлена"
                text="Все изменения сохранены в базе данных"
                onClose={onClose}
            />
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p="5"
                gap="4"
                mb="4"
            >
                <Heading as='h1' size='xl'>
                    Общая информация о конференции
                </Heading>
            </Flex>
            {isLoading
                ? <Text>Загрузка...</Text>
                : (
                    <Card borderRadius="xl">
                        <Formik
                            initialValues={information || INITIAL_FORM_STATE}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                                <Form>
                                    <CardBody>
                                        <Field name="title" disabled={isLoadingUpdate}>
                                            {({ field, form }: any) => (
                                                <FormControl isRequired mb="2">
                                                    <FormLabel>Название</FormLabel>
                                                    <Input {...field} placeholder="VIII Всероссийская молодежная научно-практическая конференция «Колачёвские чтения»" />
                                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="date" disabled={isLoadingUpdate}>
                                            {({ field, form }: any) => (
                                                <FormControl isRequired mb="2">
                                                    <FormLabel>Дата проведения</FormLabel>
                                                    <Input {...field} placeholder="07 апреля 2023 г. в 11:00" />
                                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="dateRequests" disabled={isLoadingUpdate}>
                                            {({ field, form }: any) => (
                                                <FormControl isRequired mb="2">
                                                    <FormLabel>Дата окончания подачи заявок</FormLabel>
                                                    <Input {...field} placeholder="30 марта 2023" />
                                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="place" disabled={isLoadingUpdate}>
                                            {({ field, form }: any) => (
                                                <FormControl isRequired mb="2">
                                                    <FormLabel>Место проведения</FormLabel>
                                                    <Input {...field} placeholder="Ступинский филиал МАИ" />
                                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="email" disabled={isLoadingUpdate}>
                                            {({ field, form }: any) => (
                                                <FormControl isRequired mb="2">
                                                    <FormLabel>Электронная почта</FormLabel>
                                                    <Input {...field} placeholder="kolachevconf@yandex.ru" />
                                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <RichText
                                            label="Контакты"
                                            name="contacts"
                                            isLoading={isLoadingUpdate}
                                        />
                                        <RichText
                                            label="Общая информация"
                                            name="common"
                                            isLoading={isLoadingUpdate}
                                        />
                                        <RichText
                                            label="Требования к участникам"
                                            name="requirements"
                                            isLoading={isLoadingUpdate}
                                        />
                                        <RichText
                                            label="Научная программа"
                                            name="scientificProgram"
                                            isLoading={isLoadingUpdate}
                                        />
                                        <RichText
                                            label="О конференции"
                                            name="aboutText"
                                            isLoading={isLoadingUpdate}
                                        />
                                        <RichText
                                            label="О конференции (описание)"
                                            name="aboutDescription"
                                            isLoading={isLoadingUpdate}
                                        />
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
                                        </Flex>
                                    </CardFooter>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                )
            }
        </>
    )
}

export default Information
