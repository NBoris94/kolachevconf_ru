'use client'

import { useRouter } from 'next/navigation'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { useAddGroupMutation } from '@/redux/services/groups'
import { GroupFormState } from './Groups.interfaces'
import { IGroup } from '@/interfaces/groups'
import Link from 'next/link'
import GroupForm from './GroupForm'

const CreateGroup = () => {
    const router = useRouter()
    const [ addGroup, { isLoading, error } ] = useAddGroupMutation()

    const handleSubmit = (group: GroupFormState | IGroup) => {
        addGroup(group).then(() => {
            if (!error) {
                router.push('/admin/groups')
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
                    Создать группу
                </Heading>
                <Button
                    as={Link}
                    href="/admin/groups"
                    colorScheme='teal'
                    borderRadius="full"
                >
                    Вернуться назад
                </Button>
            </Flex>
            <GroupForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}

export default CreateGroup
