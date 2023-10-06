import {BoxProps, FlexProps} from '@chakra-ui/react'
import {ILinkItem} from '@/interfaces/navigation'

export interface SidebarLinkProps extends FlexProps {
    link: ILinkItem
}
export interface MobileNavProps extends FlexProps {
    onOpen: () => void
}

export interface SidebarContentProps extends BoxProps {
    onClose: () => void
}
