'use client'

import {Flex} from '@chakra-ui/layout'
import {Heading, Text} from '@chakra-ui/react'
import {Button} from '@chakra-ui/button'
import Link from 'next/link'
import ParticipantForm from '@/components/pages/participants/ParticipantForm'
import {useGetParticipantQuery, useUpdateParticipantMutation} from '@/redux/services/participants'
import {useRouter} from 'next/navigation'
import {ParticipantFormState, UpdateParticipantProps} from '@/components/pages/participants/Participants.interfaces'
import {IParticipant} from '@/interfaces/participants'
import {resetParticipantsFilter} from '@/redux/features/participantsSlice'
import {useAppDispatch} from '@/redux/store'
import {FC} from 'react'

const UpdateParticipant: FC<UpdateParticipantProps> = (
    {
        id
    }
) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { data: participant, isLoading : isGetParticipantLoading, error: getParticipantError } = useGetParticipantQuery(id)
    const [updateParticipant, {isLoading, error}] = useUpdateParticipantMutation()

    const handleSubmit = (participant: ParticipantFormState | IParticipant) => {
        updateParticipant(participant).then(() => {
            if (!error) {
                router.push('/admin/participants')
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
                    Редактирование заявки на участие №{participant?.id}
                </Heading>
                <Button as={Link} href="/admin/participants" colorScheme='teal' borderRadius="full">Вернуться назад</Button>
            </Flex>
            {isGetParticipantLoading ? <Text>Загрузка...</Text> : <ParticipantForm participant={participant} isLoading={isLoading} error={error} onSubmit={handleSubmit} />}
        </>
    )
}

export default UpdateParticipant
