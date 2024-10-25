import { NavBar } from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { TravelStoryCard } from "../../components/Cards/TravelStoryCard"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MdAdd} from 'react-icons/md'
import Modal from 'react-modal'
import { AddEditTravelStory } from "./AddEditTravelStory"

export const Home=()=>{

    const navigate=useNavigate()
    const [userInfo,setUserInfo]=useState(null)
    const [allStories,setallStories]=useState([])
    const [openAddEditModel,setOpenAddEditModel]=useState({
        isShown:false,
        type:'add',
        data:null
    })

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
        toast.success("Story Updated Sucessfully")
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
        {/* //Add and edit travel story modal */}
        <Modal 
                isOpen={openAddEditModel.isShown}
                onRequestClose={()=>{}}
                style={{
                    overlay:{
                        backgroundColor:"rgba(0,0,0,0.2)",
                        zIndex:999,
                    },
                }}
                appElement={document.getElementById('root')}
                className="model-box"
        >
            <AddEditTravelStory
            type={openAddEditModel.type}
            storyInfo={openAddEditModel.data}
            onclose={()=>{
                setOpenAddEditModel({isShown:false,type:"add",data:null})
            }}
            getallTravelStories={getallTravelStories}
            />
        </Modal>
        <button 
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={()=>{
            setOpenAddEditModel({isShown:true,type:"add", data:null})
        }}
        >
                <MdAdd className="text-[32px] text-white"/>
        </button>
        <ToastContainer />
    </div>
    )
}