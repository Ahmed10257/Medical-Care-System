import { FC } from "react"

interface IProps{

}
const ViewMore:FC<IProps>= () => {
  return (
    <div className="bg-white flex cursor-pointer  p-6 rounded-b-lg  justify-center items-center  mb-4 text-blue-600 text-sm ">
        View more
   </div>
  )
}

export default ViewMore