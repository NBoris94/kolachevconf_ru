"use client"

import {Badge, ButtonGroup, Icon, Td, Tr} from '@chakra-ui/react'
import {Button} from '@chakra-ui/button'
import {FaCircleInfo, FaPen, FaTrash} from 'react-icons/fa6'
import {FC} from 'react'
import {IParticipant} from '@/interfaces/participants'
import { format } from 'date-fns'
import {useAppDispatch} from '@/redux/store'
import {setIsOpenDelete, setIsOpenInfo} from '@/redux/features/participantsSlice'
import Link from 'next/link'

interface ParticipantProps extends IParticipant {
}

const Participant: FC<ParticipantProps> = (
    {
        id,
        title,
        author,
        status,
        scientificAdviser,
        reqStatus,
        createdAt,
        updatedAt,
        section
    }
) => {
    const dispatch = useAppDispatch()

    let reqStatusBadge = {
        colorScheme: 'purple',
        text: 'Новая'
    }

    switch (reqStatus) {
        case 'new':
            break
        case 'accepted':
            reqStatusBadge.colorScheme = 'green'
            reqStatusBadge.text = 'Принята'
            break
        case 'rejected':
            reqStatusBadge.colorScheme = 'red'
            reqStatusBadge.text = 'Отклонена'
            break
    }

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{author}</Td>
            <Td>{title}</Td>
            <Td>{scientificAdviser}</Td>
            <Td>{section.name.substring(0, 9)}</Td>
            <Td>
                <Badge colorScheme={reqStatusBadge.colorScheme} borderRadius="full">{reqStatusBadge.text}</Badge>
            </Td>
            <Td>{format(new Date(createdAt), 'dd.MM.yyyy')}</Td>
            <Td>{format(new Date(updatedAt), 'dd.MM.yyyy')}</Td>
            <Td>
                <ButtonGroup>
                    <Button size="xs" colorScheme="blue" borderRadius="xl" onClick={() => dispatch(setIsOpenInfo({isOpenInfo: true, participantInfoId: id}))}>
                        <Icon as={FaCircleInfo} />
                    </Button>
                    <Button as={Link} href={`/admin/participants/update/${id}`} size="xs" colorScheme="yellow" borderRadius="xl">
                        <Icon as={FaPen} />
                    </Button>
                    <Button size="xs" colorScheme="red" borderRadius="xl" onClick={() => dispatch(setIsOpenDelete({isOpenDelete: true, participantDeleteId: id}))}>
                        <Icon as={FaTrash} />
                    </Button>
                </ButtonGroup>
            </Td>
        </Tr>
    )
}

export default Participant
