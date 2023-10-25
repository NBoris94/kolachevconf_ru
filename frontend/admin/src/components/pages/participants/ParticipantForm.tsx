'use client'

import { FC } from 'react'
import { Card, CardBody } from '@chakra-ui/card'
import { CardFooter, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { INITIAL_FORM_STATE } from '@/components/pages/participants/Participants.constants'
import { ParticipantFormProps, ParticipantFormState } from '@/components/pages/participants/Participants.interfaces'
import { IParticipant } from '@/interfaces/participants'
import Link from 'next/link'


const ParticipantForm: FC<ParticipantFormProps> = (
    {
        participant,
        isLoading,
        error,
        onSubmit
    }
) => {


    const handleSubmit = (values: ParticipantFormState | IParticipant, actions: FormikHelpers<ParticipantFormState | IParticipant>) => {
        values.sectionId = Number(values.sectionId)
        values.formId = Number(values.formId)
        onSubmit(values)
        actions.setSubmitting(false)
    }

    return (
        <Card borderRadius="xl">
            <Formik
                initialValues={participant || INITIAL_FORM_STATE}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <CardBody>
                            <Field name="title" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Название доклада</FormLabel>
                                        <Input {...field} placeholder='Самый лучший доклад' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="author" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Автор</FormLabel>
                                        <Input {...field} placeholder='Иванов Иван Иванович' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="secondAuthor" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl mb="2">
                                        <FormLabel>Второй автор</FormLabel>
                                        <Input {...field} placeholder='Петров Петр Петрович' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="thirdAuthor" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl mb="2">
                                        <FormLabel>Третий автор</FormLabel>
                                        <Input {...field} placeholder='Александров Александр Александрович' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="scientificAdviser" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Научный руководитель</FormLabel>
                                        <Input {...field} placeholder='Иванов Иван Иванович, к.т.н' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="status" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Кем является автор</FormLabel>
                                        <Input {...field} placeholder='Научный сотрудник, студент, преподаватель' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="place" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Наименование вуза, предприятия, школы</FormLabel>
                                        <Input {...field} placeholder='Ступинский филиал МАИ' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="sectionId" type="select" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Секция</FormLabel>
                                        <Select {...field} placeholder='Выберите секцию'>
                                            <option value={1}>Секция 1</option>
                                            <option value={2}>Секция 2</option>
                                            <option value={3}>Секция 3</option>
                                            <option value={4}>Секция 4</option>
                                            <option value={5}>Секция 5</option>
                                        </Select>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="formId" type="select" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Форма</FormLabel>
                                        <Select {...field} placeholder='Выберите форму'>
                                            <option value={1}>Форма 1</option>
                                            <option value={2}>Форма 2</option>
                                            <option value={3}>Форма 3</option>
                                            <option value={4}>Форма 4</option>
                                            <option value={5}>Форма 5</option>
                                        </Select>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="phone" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Телефон</FormLabel>
                                        <Input {...field} placeholder='+7 (999) 999-99-99' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="email" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Почта</FormLabel>
                                        <Input {...field} placeholder='test@example.com' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="file" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Файл работы</FormLabel>
                                        <Input {...field} placeholder='Ссылка на файл' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="description" type="textarea" disabled={isLoading}>
                                {({ field, form }: any) => (
                                    <FormControl isRequired mb="2">
                                        <FormLabel>Аннотация</FormLabel>
                                        <Textarea {...field} placeholder='Аннотация' />
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
                                <Button as={Link} href="/admin/participants" borderRadius="full">Отмена</Button>
                            </Flex>
                        </CardFooter>
                    </Form>
                )}
            </Formik>

        </Card>
    )
}

export default ParticipantForm
