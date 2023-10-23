import {Portal} from '@chakra-ui/portal'
import {useAppDispatch, useAppSelector} from '@/redux/store'
import {useDeleteParticipantMutation, useGetParticipantQuery} from '@/redux/services/participants'
import {setIsOpenDelete} from '@/redux/features/participantsSlice'
import {Text} from '@chakra-ui/react'
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/modal'
import {Button} from '@chakra-ui/button'

const DeleteModal = () => {
    const dispatch = useAppDispatch()
    const { isOpenDelete, participantDeleteId } = useAppSelector(state => state.participants)

    if (!participantDeleteId) {
        return null
    }

    const { data: participant, isLoading: isGetParticipantLoading, error: getErrorParticipant } = useGetParticipantQuery(participantDeleteId)
    const [deleteParticipant, { isLoading, error }] = useDeleteParticipantMutation()

    const handleClose = () => {
        dispatch(setIsOpenDelete({ isOpenDelete: false }))
    }

    const handleDelete = (id: number) => {
        deleteParticipant(id).then(() => {
            if (!error) {
                handleClose()
            }
        })
    }

    return (
        <Portal>
            <Modal onClose={handleClose} size={"lg"} isOpen={isOpenDelete}>
                <ModalOverlay />
                <ModalContent>
                    {
                        isLoading
                            ? <Text>Загрузка...</Text>
                            : participant && (
                                <>
                                    <ModalHeader>Удаление участника №{participant.id}</ModalHeader>
                                    <ModalBody>
                                        <Text>Вы уверены, что хотите удалить участника {participant.author} и работу {participant.title}?</Text>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='red' onClick={() => handleDelete(participant.id)}>Удалить</Button>
                                        <Button onClick={handleClose}>Отмена</Button>
                                    </ModalFooter>
                                </>
                            )
                    }
                </ModalContent>
            </Modal>
        </Portal>
    )
}

export default DeleteModal
