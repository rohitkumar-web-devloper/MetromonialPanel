import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { urls } from '@/routes';
import { useAuthValidator } from '@/store';
export const LoadingCallBack = () => {
    const { isAuthenticate } = useAuthValidator((state: { isAuthenticate: boolean }) => state);
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticate) {
            navigate(urls.BASE_URL)
        } else {
            navigate(urls.LOGIN)
        }
    }, [])
    return null
}