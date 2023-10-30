'use client'

import { useState } from "react"
import { Button, Card, CardBody, Flex, Heading, Table, TableContainer, Tbody, Th, Thead, Tr, Text } from "@chakra-ui/react"
import { useGetFormsQuery, useDeleteFormMutation } from "@/redux/services/forms"
import Link from "next/link"
import Form from "./Form"
import DeleteModal from "@/components/modals/DeleteModal"

const Forms = () => {
    const [ deleteFormId, setDeleteFormId ] = useState<number>(0)
    const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState<boolean>(false)
    const { data: forms, isLoading, error } = useGetFormsQuery()
    const [ deleteForm, { isLoading: isLoadingDelete, error: errorDelete } ] = useDeleteFormMutation()

    const handleDelete = () => {
        deleteForm(deleteFormId).then(() => {
            if (!errorDelete) {
                setDeleteFormId(0)
                setIsOpenDeleteModal(false)
            }
        })
    }

    return (
        <>
            <Heading as="h1" size="xl" mb="6">
                Формы участия
            </Heading>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p="5"
                gap="4"
            >
                <Button
                    as={Link}
                    href="/admin/forms/create"
                    colorScheme="blue"
                    borderRadius="full"
                >
                    Добавить
                </Button>
            </Flex>
            <Card borderRadius="xl">
                <CardBody>
                    {
                        isLoading
                            ? <Text>Загрузка...</Text>
                            : (
                                <TableContainer whiteSpace="normal">
                                    <Table variant='simple' size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>№</Th>
                                                <Th>Название</Th>
                                                <Th>Дата создания</Th>
                                                <Th>Дата обновления</Th>
                                                <Th>Действия</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {forms && forms.map((form) => (
                                                <Form
                                                    key={form.id}
                                                    {...form}
                                                    onDelete={() => {
                                                        setDeleteFormId(form.id)
                                                        setIsOpenDeleteModal(true)
                                                    }}
                                                />
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            )
                    }
                </CardBody>
            </Card>
            <DeleteModal
                isOpen={isOpenDeleteModal}
                size="lg"
                title={`Удаление формы участия ${deleteFormId}`}
                text="Вы действительно хотите удалить эту форму участия?"
                isLoading={false}
                onDelete={handleDelete}
                onClose={() => setIsOpenDeleteModal(false)}
            />
        </>
    )
}

export default Forms
