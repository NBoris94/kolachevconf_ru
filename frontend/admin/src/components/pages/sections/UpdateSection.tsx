'use client'

import { FC } from "react"
import { useRouter } from "next/navigation"
import { Flex, Heading, Button, Text } from "@chakra-ui/react"
import { UpdateSectionProps, SectionFormState } from "./Sections.interfaces"
import { useGetSectionQuery, useUpdateSectionMutation } from "@/redux/services/sections"
import { ISection } from "@/interfaces/participants"
import Link from "next/link"
import SectionForm from "./SectionForm"

const UpdateSection: FC<UpdateSectionProps> = (
    {
        id
    }
) => {
    const router = useRouter()
    const { data: section, isLoading : isGetSectionLoading, error: getSectionError } = useGetSectionQuery(id)
    const [ updateSection, { isLoading, error } ] = useUpdateSectionMutation()

    const handleSubmit = (section: SectionFormState | ISection) => {
        updateSection(section).then(() => {
            if (!error) {
                router.push('/admin/sections')
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
                    Редактирование секции №{section?.id}
                </Heading>
                <Button
                    as={Link}
                    href="/admin/sections"
                    colorScheme='teal'
                    borderRadius="full"
                >
                    Вернуться назад
                </Button>
            </Flex>
            {
                isGetSectionLoading
                    ? <Text>Загрузка...</Text>
                    : <SectionForm
                        section={section}
                        isLoading={isLoading}
                        error={error}
                        onSubmit={handleSubmit}
                    />
            }
        </>
    )
}

export default UpdateSection
