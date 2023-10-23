import {Text} from '@chakra-ui/react'
import {Flex} from '@chakra-ui/layout'
import {FC} from 'react'

interface InfoModalRowDataProps {
    title: string
    value: any
}
const InfoModalRowData: FC<InfoModalRowDataProps> = (
    {
        title,
        value
    }
) => {
    return (
        <Flex
            gap="4"
            alignItems="start"
            justifyContent="start"
            py="1"
        >
            <Text fontWeight="bold" width="200px" flexShrink="0">{title}:</Text>
            <Text>{value}</Text>
        </Flex>
    )
}

export default InfoModalRowData
