import Sidebar from '@/components/sidebar/Sidebar'
import {ReactNode} from 'react'

const AdminLayout = (
    {
        children
    } : {
        children: ReactNode
    }
) => {
    return (
        <Sidebar>{children}</Sidebar>
    )
}

export default AdminLayout
