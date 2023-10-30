import { FC } from "react"
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box } from "@chakra-ui/react"

interface SuccessAlertProps {
    isOpen: boolean
    title: string
    text: string
    onClose: () => void
}

const SuccessAlert: FC<SuccessAlertProps> = (
    {
        isOpen,
        title,
        text,
        onClose
    }
) => {
    return isOpen ? (
        <Alert status='success'>
            <AlertIcon />
            <Box>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{text}</AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                ml="auto"
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : null
}

export default SuccessAlert
