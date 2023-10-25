import {IconType} from 'react-icons'
import {
    FaBook,
    FaLayerGroup,
    FaListUl,
    FaPeopleGroup,
    FaSection,
    FaAddressCard,
    FaCircleInfo,
    FaCircleUser
} from 'react-icons/fa6'
import {ILinkCategory} from '@/interfaces/navigation'

export const navCategories: ILinkCategory[] = [
    {
        name: 'Заявки',
        links: [
            {
                name: 'Участники',
                icon: FaListUl,
                href: '/admin/participants',
            }
        ]
    },
    {
        name: 'Состав',
        links: [
            {
                name: 'Группы',
                icon: FaLayerGroup,
                href: '/admin/groups',
            },
            {
                name: 'Секции',
                icon: FaSection,
                href: '/admin/sections',
            },
            {
                name: 'Сотрудники',
                icon: FaPeopleGroup,
                href: '/admin/employees',
            }
        ]
    },
    {
        name: 'Материалы',
        links: [
            {
                name: 'Издания',
                icon: FaBook,
                href: '/admin/materials',
            }
        ]
    },
    {
        name: 'Общее',
        links: [
            {
                name: 'Формы участия',
                icon: FaAddressCard,
                href: '/admin/forms',
            },
            {
                name: 'Информация',
                icon: FaCircleInfo,
                href: '/admin/information',
            }
        ]
    },
    {
        name: 'Администрирование',
        links: [
            {
                name: 'Пользователи',
                icon: FaCircleUser,
                href: '/admin/users',
            }
        ]
    }
]
