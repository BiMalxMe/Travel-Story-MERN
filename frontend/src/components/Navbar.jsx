import { useNavigate } from 'react-router-dom'
import LOGO from '../assets/images/logo.png'
import { ProfileInfo } from './Cards/ProfileInfo'

export const NavBar=({userInfo})=>{
    const navigate=useNavigate()
    const istoken=localStorage.getItem('token')
    const onLogout=()=>{
        localStorage.clear()
        navigate('/login')
    }

    return <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-xl sticky top-0 z-0">
            <img src={LOGO} alt="" className='h-9'/>
            {istoken &&<ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
}