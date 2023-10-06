import {FC} from 'react'
import {CloseButton, Flex, useColorModeValue} from '@chakra-ui/react'
import {Box, Text} from '@chakra-ui/layout'
import {navCategories} from '@/data/navigation'
import SidebarLink from '@/components/sidebar/SidebarLink'
import {SidebarContentProps} from '@/components/sidebar/Sidebar.interfaces'
import Image from 'next/image'
import logo from '@/assets/images/logo.svg'
import Link from 'next/link'

const SidebarContent: FC<SidebarContentProps> = (
    {
        onClose,
        ...rest
    }
) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('gray.50', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                px="8"
                justifyContent="space-between"
                borderBottom="1px"
                borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            >
                <Flex gap="2" as={Link} href="/">
                    <Image src={logo} alt="logo" width={50} />
                    <Text fontWeight="600" color="#008ad1">Колачевские<br />чтения</Text>
                </Flex>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {navCategories.map(category => (
                <Flex direction="column" key={category.name}>
                    <Text mx="4" mt="4" mb="2" fontWeight="700" color="gray.500">{category.name}</Text>
                    {category.links.map(link => (
                        <SidebarLink
                            key={link.name}
                            link={link}
                        />
                    ))}
                </Flex>
            ))}
        </Box>
    )
}

export default SidebarContent
