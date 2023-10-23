'use client'

import Sidebar from '@/components/sidebar/Sidebar'
import {ReactNode, useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {selectCurrentAccessToken} from '@/redux/features/authSlice'
import {useAppSelector} from '@/redux/store'

const AdminLayout = (
    {
        children
    } : {
        children: ReactNode
    }
) => {
    const router = useRouter()
    const accessToken = useAppSelector(selectCurrentAccessToken)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    useEffect(() => {
        if (accessToken === null) {
            setIsAuth(false)
            router.push('/auth/login')
        }
        else {
            setIsAuth(true)
        }
    }, [accessToken])

    if (!isAuth) {
        return null
    }

    return (
        <Sidebar>{children}</Sidebar>
    )
}

export default AdminLayout
