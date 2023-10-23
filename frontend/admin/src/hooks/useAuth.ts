import {useRouter} from 'next/navigation'
import {useAppSelector} from '@/redux/store'

const useAuth = () => {
    const router = useRouter()
    const accessToken = useAppSelector(state => state.auth.accessToken)

    if (!accessToken) {
        router.push('/auth/login')
    }

    return accessToken
}

export default useAuth
