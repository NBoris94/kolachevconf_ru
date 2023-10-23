'use client'

import {FC} from 'react'
import {MobileNavProps} from './Sidebar.interfaces'
import {
    Avatar,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton, MenuDivider, MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react'
import {FiBell, FiChevronDown, FiMenu} from 'react-icons/fi'
import {Box} from '@chakra-ui/layout'
import {useAppSelector} from '@/redux/store'
import {selectCurrentUser} from '@/redux/features/authSlice'
import {useAppDispatch} from '@/redux/store'
import {logout} from '@/redux/features/authSlice'

const MobileNav: FC<MobileNavProps> = (
    {
        onOpen,
        ...rest
    }
) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectCurrentUser)

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('gray.50', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    name={user?.username}
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{user?.username}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Настройки</MenuItem>
                            <MenuDivider />
                            <MenuItem as="button" onClick={() => dispatch(logout())}>Выйти</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

export default MobileNav
