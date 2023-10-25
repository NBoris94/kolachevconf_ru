export interface DeleteModalProps {
    isOpen: boolean
    size?: string
    title: string
    text: string
    isLoading: boolean
    onDelete: () => void
    onClose: () => void
}
