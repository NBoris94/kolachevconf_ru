'use client'

import { useState } from "react"
import { Button, Card, CardBody, Flex, Heading, Table, TableContainer, Tbody, Th, Thead, Tr, Text } from "@chakra-ui/react"
import { useGetGroupsQuery, useDeleteGroupMutation } from "@/redux/services/groups"
import Link from "next/link"
import Group from "./Group"
import DeleteModal from "@/components/modals/DeleteModal"

const Groups = () => {
    const [ deleteGroupId, setDeleteGroupId ] = useState<number>(0)
    const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState<boolean>(false)
    const { data: groups, isLoading, error } = useGetGroupsQuery()
    const [ deleteGroup, { isLoading: isLoadingDelete, error: errorDelete } ] = useDeleteGroupMutation()

    const handleDelete = () => {
        deleteGroup(deleteGroupId).then(() => {
            if (!errorDelete) {
                setDeleteGroupId(0)
                setIsOpenDeleteModal(false)
            }
        })
    }

    return (
        <>
            <Heading as="h1" size="xl" mb="6">
                Группы
            </Heading>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p="5"
                gap="4"
            >
                <Button
                    as={Link}
                    href="/admin/groups/create"
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
                                            {groups && groups.map((group) => (
                                                <Group
                                                    key={group.id}
                                                    {...group}
                                                    onDelete={() => {
                                                        setDeleteGroupId(group.id)
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
                title={`Удаление группы ${deleteGroupId}`}
                text="Вы действительно хотите удалить эту группу?"
                isLoading={false}
                onDelete={handleDelete}
                onClose={() => setIsOpenDeleteModal(false)}
            />
        </>
    )
}

export default Groups
