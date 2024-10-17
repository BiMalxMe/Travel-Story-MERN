import moment from 'moment/moment'

export const TravelStoryCard = ({
  imageUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavouite,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer" >
      <img src={imageUrl} 
      alt={title} 
      className="w-full h-56 object-cover rounded-lg" 
      onClick={onclick}
      />

      <div className="p-4" onclick={onclick}>
        <div className="flex items-center gap-3">
            <div className="flex-1">
                <h6 className="text-sm font-medium">{title}</h6>
                <span className="text-xs text-slate-500">
                    {date?moment(date).format("Do MMM YYYY"):"-"}
                </span>
            </div>
        </div>
        <p className='text-xs text-slate-600 mt-2'>{story?.slice(0,60)}</p>

        <div className=''>
            <GrMapLocation className="text-sm"/>
            {visitedLocation.map((item,index)=>
            visitedLocation.length==index+1?`${item}`:`${item}`
            )}
        </div>
      </div>
    </div>
  );
};
