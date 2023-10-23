import {Portal} from '@chakra-ui/portal'
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/modal'
import {useDisclosure} from '@chakra-ui/hooks'
import {Button} from '@chakra-ui/button'
import {Badge, Divider, Text} from '@chakra-ui/react'
import {useAppDispatch, useAppSelector} from '@/redux/store'
import {setIsOpenInfo} from '@/redux/features/participantsSlice'
import {useGetParticipantQuery} from '@/redux/services/participants'
import {Flex} from '@chakra-ui/layout'
import InfoModalRowData from '@/components/pages/participants/InfoModalRowData'
import {format} from 'date-fns'

const InfoModal = () => {
    const dispatch = useAppDispatch()
    const { isOpenInfo, participantInfoId } = useAppSelector(state => state.participants)

    if (!participantInfoId) {
        return null
    }

    const { data: participant, isLoading, error } = useGetParticipantQuery(participantInfoId)

    const handleClose = () => {
        dispatch(setIsOpenInfo({ isOpenInfo: false }))
    }

    let reqStatusBadge = {
        colorScheme: 'purple',
        text: 'Новая'
    }
    switch (participant?.status) {
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
        <Portal>
            <Modal onClose={handleClose} size={"3xl"} isOpen={isOpenInfo}>
                <ModalOverlay />
                <ModalContent>
                    {
                        isLoading
                            ? <Text>Загрузка...</Text>
                            : participant && (
                                <>
                                    <ModalHeader>Информация по участнику {participant.author}</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <InfoModalRowData title="id" value={participant.id} />
                                        <Divider />
                                        <InfoModalRowData title="Название доклада" value={participant.title} />
                                        <Divider />
                                        <InfoModalRowData title="Статус" value={<Badge colorScheme={reqStatusBadge.colorScheme} borderRadius="full">{reqStatusBadge.text}</Badge>} />
                                        <Divider />
                                        <InfoModalRowData title="Автор" value={participant.author} />
                                        <Divider />
                                        <InfoModalRowData title="Второй автор" value={participant.secondAuthor} />
                                        <Divider />
                                        <InfoModalRowData title="Третий автор" value={participant.thirdAuthor} />
                                        <Divider />
                                        <InfoModalRowData title="Кем является" value={participant.status} />
                                        <Divider />
                                        <InfoModalRowData title="Наименование вуза, предприятия, школы" value={participant.place} />
                                        <Divider />
                                        <InfoModalRowData title="Научный руководитель(-ли)" value={participant.scientificAdviser} />
                                        <Divider />
                                        <InfoModalRowData title="Секция" value={participant.section.name} />
                                        <Divider />
                                        <InfoModalRowData title="Форма" value={participant.form.name} />
                                        <Divider />
                                        <InfoModalRowData title="Телефон" value={participant.phone} />
                                        <Divider />
                                        <InfoModalRowData title="Почта" value={participant.email} />
                                        <Divider />
                                        <InfoModalRowData title="Файл работы" value={participant.file} />
                                        <Divider />
                                        <InfoModalRowData title="Аннотация" value={participant.description} />
                                        <Divider />
                                        <InfoModalRowData title="Дата создания" value={format(new Date(participant.createdAt), 'dd.MM.yyyy HH:mm')} />
                                        <Divider />
                                        <InfoModalRowData title="Дата изменения" value={format(new Date(participant.updatedAt), 'dd.MM.yyyy HH:mm')} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={handleClose}>Закрыть</Button>
                                    </ModalFooter>
                                </>
                            )
                    }
                </ModalContent>
            </Modal>
        </Portal>
    )
}

export default InfoModal
