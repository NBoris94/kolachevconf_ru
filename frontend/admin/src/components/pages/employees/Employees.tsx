'use client'

import { useState } from "react"
import { Button, Card, CardBody, Flex, Heading, Table, TableContainer, Tbody, Th, Thead, Tr, Text } from "@chakra-ui/react"
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from "@/redux/services/employees"
import Link from "next/link"
import Employee from "./Employee"
import DeleteModal from "@/components/modals/DeleteModal"

const Employees = () => {
    const [ deleteEmployeeId, setDeleteEmployeeId ] = useState<number>(0)
    const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState<boolean>(false)
    const { data: employees, isLoading, error } = useGetEmployeesQuery()
    const [ deleteEmployee, { isLoading: isLoadingDelete, error: errorDelete } ] = useDeleteEmployeeMutation()

    const handleDelete = () => {
        deleteEmployee(deleteEmployeeId).then(() => {
            if (!errorDelete) {
                setDeleteEmployeeId(0)
                setIsOpenDeleteModal(false)
            }
        })
    }

    return (
        <>
            <Heading as="h1" size="xl" mb="6">
                Сотрудники
            </Heading>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p="5"
                gap="4"
            >
                <Button
                    as={Link}
                    href="/admin/employees/create"
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
                                                <Th>ФИО</Th>
                                                <Th>Должность</Th>
                                                <Th>Дата создания</Th>
                                                <Th>Дата обновления</Th>
                                                <Th>Действия</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {employees && employees.map((employee) => (
                                                <Employee
                                                    key={employee.id}
                                                    {...employee}
                                                    onDelete={() => {
                                                        setDeleteEmployeeId(employee.id)
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
                title={`Удаление сотрудника ${deleteEmployeeId}`}
                text="Вы действительно хотите удалить этого сотрудника?"
                isLoading={false}
                onDelete={handleDelete}
                onClose={() => setIsOpenDeleteModal(false)}
            />
        </>
    )
}

export default Employees
