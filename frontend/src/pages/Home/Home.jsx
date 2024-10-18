import { NavBar } from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { TravelStoryCard } from "../../components/Cards/TravelStoryCard"


export const Home=()=>{

    const navigate=useNavigate()
    const [userInfo,setUserInfo]=useState(null)
    const [allStories,setallStories]=useState([])

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

    //Get all travel stories
    const getallTravelStories=async()=>{
        try{
            const response=await axiosInstance.get('/get-all-stories');
            if(response.data && response.data.stories){
                setallStories(response.data.stories)
            }
        }catch(err){
            console.log('An unexpected error occured. Please try again')
        }
    }
//handle Edit Story Click
const handleEdit=(data)=>{}

//handle travel story click
const handleViewStory=(data)=>{}

//handle update favourite
const updateIsFavourite=async (storyData)=>{
     const storyId=storyData._id
   
     try{
        const response=await axiosInstance.put('/update-is-favourite/'+storyId,{
                isFavourite:!storyData.isFavourite,
        }
    );
    if(response.data && response.data.story){
        getallTravelStories()
    }
     }catch(err){
        console.log('An unexpected error occured. Please try again')
     }
}
    useEffect(()=>{
        getallTravelStories()
            getuserInfo()
            return ()=>{}
    },[])

    

    if (!userInfo) {
        return <div>Loading...</div>; // You can show a loading spinner or placeholder here
    }

    return (<div>
        <NavBar userInfo={userInfo} />

    <div className="container mx-auto py-10">
        <div className="flex gap-7">
            <div className="flex-1">
            {allStories.length>0?(
                <div className="grid grid-cols-2 gap-4">
                    {allStories.map((item)=>{
                        return (
                            <TravelStoryCard
                             key={item._id}
                             imageUrl={item.imageUrl}
                             title={item.title}
                             story={item.story}
                             date={item.visitedDate}
                             visitedLocation={item.visitedLocation}
                             isFavourite={item.isFavourite}
                             onEdit={()=>handleEdit(item)}
                             onclick={()=>handleViewStory(item)}
                             onFavouriteClick={()=>updateIsFavourite(item)}
                             />
                        );
                    })}
                </div>
            ):(
                <>Empty Card Here</>
            )}
            </div>
            <div className="w-[320px]"></div>
            </div>
        </div>
    </div>
    )
}