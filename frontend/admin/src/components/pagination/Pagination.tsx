'use client'

import {Flex} from '@chakra-ui/layout'
import {ButtonGroup, Icon, Input, Text, useColorModeValue} from '@chakra-ui/react'
import {Button} from '@chakra-ui/button'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa6'
import {ChangeEvent, FC, useEffect, useState} from 'react'

interface PaginationProps {
    currentPage: number
    itemsCount: number
    limit: number
    setCurrentPage: (page: number) => void
}

const Pagination: FC<PaginationProps> = (
    {
        currentPage,
        itemsCount,
        limit,
        setCurrentPage
    }
) => {
    const [page, setPage] = useState<string>(currentPage.toString())
    const totalPages = Math.ceil(itemsCount / limit)

    useEffect(() => {
        setPage(currentPage.toString())
    }, [currentPage])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value !== '' && !isNaN(Number(value))) {
            if (Number(value) >= 1 && Number(value) <= totalPages) {
                setPage(value)
            }
        }
        else if (value === '') {
            setPage('')
        }
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (page !== '') {
            setCurrentPage(Number(page))
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <Flex width="100%" justifyContent="space-between" alignItems="center">
            <Text
                fontWeight="600"
                color={useColorModeValue('gray.400', 'gray.400')}
            >
                Всего элементов: <Text as="span" color="black">{itemsCount}</Text>
            </Text>
            <ButtonGroup gap='2' alignItems="center">
                <Button
                    isDisabled={currentPage === 1}
                    fontWeight="600"
                    onClick={handlePreviousPage}
                >
                    <Icon as={FaAngleLeft} />
                </Button>
                <form onSubmit={handleSubmit}>
                    <Input
                        width="64px"
                        fontWeight="600"
                        value={page}
                        onChange={handleChange}
                    />
                    <Button type="submit" display="none"></Button>
                </form>
                <Text fontWeight="600" px="1">/</Text>
                <Text fontWeight="600" px="1">{totalPages}</Text>
                <Button
                    isDisabled={currentPage === totalPages}
                    fontWeight="600"
                    onClick={handleNextPage}
                >
                    <Icon as={FaAngleRight} />
                </Button>
            </ButtonGroup>
        </Flex>
    )
}

export default Pagination
