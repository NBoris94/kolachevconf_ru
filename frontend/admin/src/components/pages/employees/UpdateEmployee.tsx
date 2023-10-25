'use client'

import { FC } from "react"
import { useRouter } from "next/navigation"
import { Flex, Heading, Button, Text } from "@chakra-ui/react"
import { UpdateEmployeeProps, EmployeeFormState } from "./Employees.interfaces"
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from "@/redux/services/employees"
import { IEmployee } from "@/interfaces/employees"
import Link from "next/link"
import EmployeeForm from "./EmployeeForm"

const UpdateEmployee: FC<UpdateEmployeeProps> = (
    {
        id
    }
) => {
    const router = useRouter()
    const { data: employee, isLoading : isGetEmployeeLoading, error: getEmployeeError } = useGetEmployeeQuery(id)
    const [ updateEmployee, { isLoading, error } ] = useUpdateEmployeeMutation()

    const handleSubmit = (employee: EmployeeFormState | IEmployee) => {
        updateEmployee(employee).then(() => {
            if (!error) {
                router.push('/admin/employees')
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
                    Редактирование сотрудника
                </Heading>
                <Button
                    as={Link}
                    href="/admin/employees"
                    colorScheme='teal'
                    borderRadius="full"
                >
                    Вернуться назад
                </Button>
            </Flex>
            {
                isGetEmployeeLoading
                    ? <Text>Загрузка...</Text>
                    : <EmployeeForm
                        employee={employee}
                        isLoading={isLoading}
                        error={error}
                        onSubmit={handleSubmit}
                    />
            }
        </>
    )
}

export default UpdateEmployee
