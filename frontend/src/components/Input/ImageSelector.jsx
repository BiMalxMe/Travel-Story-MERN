import { useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

export const ImageSelector=({image,setImage})=>{
    const inputRef=useRef(null);
    const [previewUrl,setPreviewUrl]=useState(null)

        const handleImageChange=()=>{}

    return(
        <div>
            <input 
            type="file" 
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
            />
            <button className="" onClick={()=>{}}>
                <div className="">
                    <FaRegFileImage
                </div>
            </button>
        </div>
    )
}