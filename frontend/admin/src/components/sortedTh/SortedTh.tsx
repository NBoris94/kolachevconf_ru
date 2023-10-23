import {FC} from 'react'
import {Box} from '@chakra-ui/layout'
import {Icon, Th} from '@chakra-ui/react'
import {FaAngleDown, FaAngleUp} from 'react-icons/fa6'
import {ISort} from '@/redux/features/participantsSlice'

interface SortedThProps {
    text: string
    sortType: string
    currentSort: ISort
    changeSort: () => void
}
const SortedTh: FC<SortedThProps> = (
    {
        text,
        sortType,
        currentSort,
        changeSort
    }
) => {
    return (
        <Th>
            <Box
                as="button"
                type="button"
                fontWeight="700"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                onClick={changeSort}
                transition="color 0.2s ease-in-out"
                _hover={{
                    color: 'cyan.400',
                }}
            >
                {text.toUpperCase()}
                {sortType === currentSort.type
                    ? currentSort.orderBy === 'ASC'
                        ? <Icon as={FaAngleUp} />
                        : <Icon as={FaAngleDown} />
                    : null
                }
            </Box>
        </Th>
    )
}

export default SortedTh
