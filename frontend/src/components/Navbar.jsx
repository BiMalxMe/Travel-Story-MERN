import LOGO from '../assets/images/logo.png'
import { ProfileInfo } from './Cards/ProfileInfo'

export const NavBar=({userInfo})=>{
    return <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-xl sticky top-0 z-0">
            <img src={LOGO} alt="" className='h-9'/>
            <ProfileInfo userInfo={userInfo} />
    </div>
}