import { NavBar } from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"


export const Home=()=>{

    const navigate=useNavigate()
    const [userInfo,setUserInfo]=useState(null)
    //get user Info
  
    const getuserInfo=async()=>{
        try{
            const response=await axiosInstance.get('/get-user')
            if(response.data && response.data.user){
                //set userInfo if it exists
                setUserInfo(response.data.user)
            }
        }catch(error){
            if(error.response.status===401){
                //clear storage if unauthorized
                localStorage.clear();
                navigate('/login');//Redirect to login
            }
        }
    }
    useEffect(()=>{
            getuserInfo()
            return ()=>{}
    },[])

    

    if (!userInfo) {
        return <div>Loading...</div>; // You can show a loading spinner or placeholder here
    }

    return <NavBar userInfo={userInfo} />;
}