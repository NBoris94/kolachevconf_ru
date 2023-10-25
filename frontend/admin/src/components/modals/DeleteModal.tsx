import { FC } from "react"
import { Portal, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, ButtonGroup, Text } from "@chakra-ui/react"
import { DeleteModalProps } from "./DeleteModal.interfaces"

const DeleteModal: FC<DeleteModalProps> = (
    {
        isOpen,
        size,
        title,
        text,
        isLoading,
        onDelete,
        onClose
    }
) => {
    return (
        <Portal>
            <Modal onClose={onClose} size={size} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    {
                        isLoading
                            ? <Text>Загрузка...</Text>
                            : (
                                <>
                                    <ModalHeader>{title}</ModalHeader>
                                    <ModalBody>
                                        <Text>{text}</Text>
                                    </ModalBody>
                                    <ModalFooter>
                                        <ButtonGroup
                                            display="flex"
                                            gap={"2"}
                                        >
                                            <Button
                                                colorScheme='red'
                                                onClick={onDelete}
                                            >
                                                Удалить
                                            </Button>
                                            <Button
                                                onClick={onClose}
                                            >
                                                Отмена
                                            </Button>
                                        </ButtonGroup>
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

