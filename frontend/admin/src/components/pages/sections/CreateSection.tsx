'use client'

import { useRouter } from 'next/navigation'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { useAddSectionMutation } from '@/redux/services/sections'
import { SectionFormState } from './Sections.interfaces'
import { ISection } from '@/interfaces/participants'
import Link from 'next/link'
import SectionForm from './SectionForm'

const CreateSection = () => {
    const router = useRouter()
    const [ addSection, { isLoading, error } ] = useAddSectionMutation()

    const handleSubmit = (section: SectionFormState | ISection) => {
        addSection(section).then(() => {
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
                    Создать секцию
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
            <SectionForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}

export default CreateSection
