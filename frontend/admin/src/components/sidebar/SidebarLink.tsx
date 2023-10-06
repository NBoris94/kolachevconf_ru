import {FC, useEffect, useState} from 'react'
import Link from 'next/link'
import {Box} from '@chakra-ui/layout'
import {Flex, Icon, Text, useColorModeValue} from '@chakra-ui/react'
import {SidebarLinkProps} from '@/components/sidebar/Sidebar.interfaces'
import {usePathname} from 'next/navigation'

const SidebarLink: FC<SidebarLinkProps> = (
    {
        link: {name, href, icon},
        ...rest
    }
) => {
    const pathname = usePathname()
    const [isActive, setIsActive] = useState<boolean>(href === pathname)

    useEffect(() => {
        setIsActive(href === pathname)
    }, [pathname])

    return (
        <Box
            as={Link}
            href={href}
        >
            <Flex
                align="center"
                p="2"
                mx="4"
                my="1"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                {...rest}
            >
                {icon && (
                    <Flex
                        bg={isActive ? useColorModeValue('cyan.400', 'cyan.400') : useColorModeValue('white', 'white')}
                        color={isActive ? useColorModeValue('white', 'white') : useColorModeValue('black', 'black')}
                        mr="4"
                        p="2"
                        borderRadius="lg"
                        boxShadow="md"
                        transition="all 0.2s ease-in-out"
                        _groupHover={{
                            bg: useColorModeValue('cyan.400', 'cyan.400'),
                            color: useColorModeValue('white', 'white')
                        }}
                    >
                        <Icon
                            fontSize="16"
                            as={icon}
                        />
                    </Flex>
                )}
                <Text
                    fontWeight="medium"
                    color={isActive ? useColorModeValue('cyan.500', 'cyan.500') : useColorModeValue('black', 'black')}
                    transition="all 0.2s ease-in-out"
                    _groupHover={{ color: useColorModeValue('cyan.500', 'cyan.500') }}
                >
                    {name}
                </Text>
            </Flex>

        </Box>
    )
}

export default SidebarLink
