'use client'

import { useState } from "react"
import { Button, Card, CardBody, Flex, Heading, Table, TableContainer, Tbody, Th, Thead, Tr, Text } from "@chakra-ui/react"
import { useGetSectionsQuery, useDeleteSectionMutation } from "@/redux/services/sections"
import Link from "next/link"
import Section from "./Section"
import DeleteModal from "@/components/modals/DeleteModal"

const Sections = () => {
    const [ deleteSectionId, setDeleteSectionId ] = useState<number>(0)
    const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState<boolean>(false)
    const { data: sections, isLoading, error } = useGetSectionsQuery()
    const [ deleteSection, { isLoading: isLoadingDelete, error: errorDelete } ] = useDeleteSectionMutation()

    const handleDelete = () => {
        deleteSection(deleteSectionId).then(() => {
            if (!errorDelete) {
                setDeleteSectionId(0)
                setIsOpenDeleteModal(false)
            }
        })
    }

    return (
        <>
            <Heading as="h1" size="xl" mb="6">
                Секции
            </Heading>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p="5"
                gap="4"
            >
                <Button
                    as={Link}
                    href="/admin/sections/create"
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
                                            {sections && sections.map((section) => (
                                                <Section
                                                    key={section.id}
                                                    {...section}
                                                    onDelete={() => {
                                                        setDeleteSectionId(section.id)
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
                title={`Удаление секции ${deleteSectionId}`}
                text="Вы действительно хотите удалить эту секцию?"
                isLoading={false}
                onDelete={handleDelete}
                onClose={() => setIsOpenDeleteModal(false)}
            />
        </>
    )
}

export default Sections
