'use client'

import {useDisclosure} from '@chakra-ui/hooks'
import {Drawer, DrawerContent, useColorModeValue} from '@chakra-ui/react'
import SidebarContent from '@/components/sidebar/SidebarContent'
import {Box} from '@chakra-ui/layout'
import MobileNav from '@/components/sidebar/MobileNav'
import {ReactNode} from 'react'

const Sidebar = (
    {
        children
    } : {
        children: ReactNode
    }
) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="8">
                {children}
            </Box>
        </Box>
    )
}

export default Sidebar
