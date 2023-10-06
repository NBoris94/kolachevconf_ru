import {IconType} from 'react-icons'

export interface ILinkItem {
    name: string
    icon?: IconType
    href: string
}

export interface ILinkCategory {
    name: string
    links: ILinkItem[]
}
