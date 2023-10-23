"use client"

import {ButtonGroup} from '@chakra-ui/react'
import {Button} from '@chakra-ui/button'
import {useGetSectionsQuery} from '@/redux/services/sections'
import {FC} from 'react'
import {useAppDispatch} from '@/redux/store'
import {setSectionId} from '@/redux/features/participantsSlice'

interface SectionsFilterProps {
    sectionId?: number
}
const SectionsFilter: FC<SectionsFilterProps> = (
    {
        sectionId
    }
) => {
    const dispatch = useAppDispatch()
    const { data: sections, isLoading } = useGetSectionsQuery()

    return (
        <ButtonGroup>
            <Button
                borderRadius="full"
                colorScheme={sectionId ? 'gray' : 'cyan'}
                color={sectionId ? 'black' : 'white'}
                onClick={() => dispatch(setSectionId(undefined))}
            >
                Все
            </Button>
            {sections && sections.map(section => (
                <Button
                    key={section.id}
                    borderRadius="full"
                    colorScheme={sectionId === section.id ? 'cyan' : 'gray'}
                    color={sectionId === section.id ? 'white' : 'black'}
                    onClick={() => dispatch(setSectionId(section.id))}
                >
                    {section.name.substring(0, 9)}
                </Button>
            ))}
        </ButtonGroup>
    )
}

export default SectionsFilter
