import { MdStars } from "react-icons/md";
const NoReview= () => {
  
  return (
    <div className="bg-white flex flex-col  justify-center  gap-4 items-center p-10  border-b-2   ">
    
    <div className="group">
      <MdStars className="text-blue-600 group-hover:text-yellow-500 w-14 h-14 transition-transform duration-300 group-hover:scale-150 fill-current" />
    </div>                <p className="text-2xl text-gray-500">  Not Review Yet
                </p>
            </div>
                
  )
}

export default NoReview;