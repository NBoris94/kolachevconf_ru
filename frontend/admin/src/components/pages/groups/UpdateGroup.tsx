'use client'

import { FC } from "react"
import { useRouter } from "next/navigation"
import { Flex, Heading, Button, Text } from "@chakra-ui/react"
import { UpdateGroupProps, GroupFormState } from "./Groups.interfaces"
import { useGetGroupQuery, useUpdateGroupMutation } from "@/redux/services/groups"
import { IGroup } from "@/interfaces/groups"
import Link from "next/link"
import GroupForm from "./GroupForm"

const UpdateGroup: FC<UpdateGroupProps> = (
    {
        id
    }
) => {
    const router = useRouter()
    const { data: group, isLoading: isGetGroupLoading, error: groupError } = useGetGroupQuery(id)
    const [ updateGroup, { isLoading, error } ] = useUpdateGroupMutation()

    const handleSubmit = (group: GroupFormState | IGroup) => {
        updateGroup(group).then(() => {
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
                    Редактирование группы №{group?.id}
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
            {
                isGetGroupLoading
                    ? <Text>Загрузка...</Text>
                    : <GroupForm
                        group={group}
                        isLoading={isLoading}
                        error={error}
                        onSubmit={handleSubmit}
                    />
            }
        </>
    )
}

export default UpdateGroup
