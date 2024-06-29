import { useEffect } from "react";
import { configAxios } from "../config/api";

interface IProps {
    
}
const Home = (props: IProps) => {  
    // for test
    useEffect(() => {
        configAxios.get("/auth/profile").then((response) => {
            console.log("Profile", response.data);
          }).catch((error) => {
            console.log("Profile error", error);
          });
    } , []); 
    console.log(props);
    return (
        <div>
            Home Page
        </div>
    );
};

export default Home;