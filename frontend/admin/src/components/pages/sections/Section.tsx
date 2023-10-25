import { FC } from "react"
import { Button, ButtonGroup, Tr, Td, Icon } from "@chakra-ui/react"
import { FaPen, FaTrash } from "react-icons/fa6"
import { format } from "date-fns"
import { SectionProps } from "./Sections.interfaces"
import Link from "next/link"

const Section: FC<SectionProps> = (
    {
        id,
        name,
        createdAt,
        updatedAt,
        onDelete
    }
) => {
    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td>{format(new Date(createdAt), 'dd.MM.yyyy')}</Td>
            <Td>{format(new Date(updatedAt), 'dd.MM.yyyy')}</Td>
            <Td>
                <ButtonGroup>
                    <Button as={Link} href={`/admin/sections/update/${id}`} size="xs" colorScheme="yellow" borderRadius="xl">
                        <Icon as={FaPen} />
                    </Button>
                    <Button
                        size="xs"
                        colorScheme="red"
                        borderRadius="xl"
                        onClick={onDelete}
                    >
                        <Icon as={FaTrash} />
                    </Button>
                </ButtonGroup>
            </Td>
        </Tr>
    )
}

export default Section
