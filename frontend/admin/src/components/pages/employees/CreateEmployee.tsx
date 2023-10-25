'use client'

import { useRouter } from 'next/navigation'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { useAddEmployeeMutation } from '@/redux/services/employees'
import { EmployeeFormState } from './Employees.interfaces'
import { IEmployee } from '@/interfaces/employees'
import Link from 'next/link'
import EmployeeForm from './EmployeeForm'

const CreateEmployee = () => {
    const router = useRouter()
    const [ addEmployee, { isLoading, error } ] = useAddEmployeeMutation()

    const handleSubmit = (employee: EmployeeFormState | IEmployee) => {
        addEmployee(employee).then(() => {
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
                    Создать сотрудника
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
            <EmployeeForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}

export default CreateEmployee
