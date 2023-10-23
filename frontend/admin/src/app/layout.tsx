import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import {Providers} from './providers'

const font = Open_Sans({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
    title: 'Панель администратора - Колачевские чтения',
    description: 'Панель администратора - Колачевские чтения',
}

export default function RootLayout(
    {
        children,
    }: {
        children: ReactNode
    }) {
    return (
        <html lang="ru">
            <body className={font.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
