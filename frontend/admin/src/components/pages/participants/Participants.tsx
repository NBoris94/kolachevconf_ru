'use client'

import {
    CardFooter, CardHeader,
    Heading, Input,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import {Card, CardBody} from '@chakra-ui/card'
import {Text} from '@chakra-ui/react'
import Pagination from '@/components/pagination/Pagination'
import Participant from '@/components/pages/participants/Participant'
import {useGetParticipantsQuery} from '@/redux/services/participants'
import {useAppDispatch, useAppSelector} from '@/redux/store'
import {resetParticipantsFilter, setPage, setSearch, setSort} from '@/redux/features/participantsSlice'
import {Flex} from '@chakra-ui/layout'
import {Button} from '@chakra-ui/button'
import SectionsFilter from '@/components/pages/participants/SectionsFilter'
import SortedTh from '@/components/sortedTh/SortedTh'
import InfoModal from '@/components/pages/participants/InfoModal'
import Link from 'next/link'
import DeleteModal from '@/components/pages/participants/DeleteModal'

const Participants = () => {
    const dispatch = useAppDispatch()
    const {
        currentPage,
        limit,
        search,
        sort,
        sectionId
    } = useAppSelector(state => state.participants)
    const { data: participants, isLoading } = useGetParticipantsQuery({
        limit,
        offset: currentPage - 1,
        search,
        sort: sort.type,
        orderBy: sort.orderBy,
        sectionId,
        accessToken: '123'
    })


    return (
        <>
            <Heading as='h1' size='xl' mb="6">
                Участники конференции {}
            </Heading>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p="5"
                gap="4"
            >
                <Button as={Link} href="/admin/participants/create" colorScheme="blue" borderRadius="full">
                    Добавить участника
                </Button>
                <Button colorScheme='teal' borderRadius="full">Экспорт в Excel</Button>
            </Flex>
            <Card borderRadius="xl">
                <CardHeader>
                    <Flex
                        alignItems="center"
                        gap="4"
                    >
                        <SectionsFilter sectionId={sectionId} />
                        <Input
                            width="auto"
                            ml="auto"
                            value={search}
                            onChange={(e) => dispatch(setSearch(e.target.value))}
                            placeholder="Поиск..."
                            borderRadius="full"
                        />
                        <Button
                            colorScheme='gray'
                            borderRadius="full"
                            onClick={() => dispatch(resetParticipantsFilter())}
                        >
                            Сбросить фильтр
                        </Button>
                    </Flex>
                </CardHeader>
                {
                    isLoading
                        ? (
                            <CardBody>
                                <Text>Загрузка...</Text>
                            </CardBody>
                        ) : participants?.rows.length === 0
                            ? (
                                <CardBody>
                                    <Text>Данные, соответствующие данному запросу, не найдены!</Text>
                                </CardBody>
                            )
                            : (
                            <>
                                <CardBody>
                                    <TableContainer whiteSpace="normal">
                                        <Table variant='simple' size="sm">
                                            <Thead>
                                                <Tr>
                                                    <SortedTh
                                                        text="id"
                                                        sortType="id"
                                                        currentSort={sort}
                                                        changeSort={() => dispatch(setSort({ type: 'id', orderBy: sort.orderBy === 'ASC' ? 'DESC' : 'ASC' }))}
                                                    />
                                                    <SortedTh
                                                        text="Автор"
                                                        sortType="author"
                                                        currentSort={sort}
                                                        changeSort={() => dispatch(setSort({ type: 'author', orderBy: sort.orderBy === 'ASC' ? 'DESC' : 'ASC' }))}
                                                    />
                                                    <SortedTh
                                                        text="Название доклада"
                                                        sortType="title"
                                                        currentSort={sort}
                                                        changeSort={() => dispatch(setSort({ type: 'title', orderBy: sort.orderBy === 'ASC' ? 'DESC' : 'ASC' }))}
                                                    />
                                                    <SortedTh
                                                        text="Научный руководитель"
                                                        sortType="scientificAdviser"
                                                        currentSort={sort}
                                                        changeSort={() => dispatch(setSort({ type: 'scientificAdviser', orderBy: sort.orderBy === 'ASC' ? 'DESC' : 'ASC' }))}
                                                    />
                                                    <SortedTh
                                                        text="Секция"
                                                        sortType="section"
                                                        currentSort={sort}
                                                        changeSort={() => dispatch(setSort({ type: 'section', orderBy: sort.orderBy === 'ASC' ? 'DESC' : 'ASC' }))}
                                                    />
                                                    <SortedTh
                                                        text="Статус"
                                                        sortType="reqStatus"
                                                        currentSort={sort}
                                                        changeSort={() => dispatch(setSort({ type: 'reqStatus', orderBy: sort.orderBy === 'ASC' ? 'DESC' : 'ASC' }))}
                                                    />
                                                    <SortedTh
                                                        text="Дата создания"
                                                        sortType="createdAt"
                                                        currentSort={sort}
                                                        changeSort={() => dispatch(setSort({ type: 'createdAt', orderBy: sort.orderBy === 'ASC' ? 'DESC' : 'ASC' }))}
                                                    />
                                                    <SortedTh
                                                        text="Дата изменения"
                                                        sortType="updatedAt"
                                                        currentSort={sort}
                                                        changeSort={() => dispatch(setSort({ type: 'updatedAt', orderBy: sort.orderBy === 'ASC' ? 'DESC' : 'ASC' }))}
                                                    />
                                                    <Th>Действия</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {participants && participants.rows.map((participant, index) => (
                                                    <Participant key={participant.id} {...participant} />
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </CardBody>
                                <CardFooter>
                                    <Pagination
                                        currentPage={currentPage}
                                        itemsCount={participants ? participants.count : 0}
                                        limit={limit}
                                        setCurrentPage={(page: number) => dispatch(setPage(page))}
                                    />
                                </CardFooter>
                            </>
                    )
                }
            </Card>
            <InfoModal />
            <DeleteModal />
        </>
    )
}

export default Participants
