'use client'

import ParticipantForm from '@/components/pages/participants/ParticipantForm'
import {Heading} from '@chakra-ui/react'
import {Flex} from '@chakra-ui/layout'
import {Button} from '@chakra-ui/button'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useAppDispatch} from '@/redux/store'
import {useAddParticipantMutation} from '@/redux/services/participants'
import {ParticipantFormState} from '@/components/pages/participants/Participants.interfaces'
import {IParticipant} from '@/interfaces/participants'
import {resetParticipantsFilter} from '@/redux/features/participantsSlice'

const CreateParticipant = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [addParticipant, {isLoading, error}] = useAddParticipantMutation()
    const handleSubmit = (participant: ParticipantFormState | IParticipant) => {
        addParticipant(participant).then(() => {
            if (!error) {
                dispatch(resetParticipantsFilter())
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
                    Создать заявку на участие
                </Heading>
                <Button as={Link} href="/admin/participants" colorScheme='teal' borderRadius="full">Вернуться назад</Button>
            </Flex>
            <ParticipantForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        </>
    )
}

export default CreateParticipant
