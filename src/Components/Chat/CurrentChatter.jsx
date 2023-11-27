import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatterContext } from "../../Context/ChatterContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CurrentChatter = () => {
  const {currentChatter} = useContext(ChatterContext);
  const [isActive,setIsActive] = useState(false);

  useEffect(() => {
    
    if(currentChatter){
      const docRef = doc(db, "activeUsers", currentChatter.userID);
    
      const getData = async () => {
        const docSnap = await getDoc(docRef);
  
        if(docSnap.exists()){
          setIsActive(true);
        }
        else{
          setIsActive(false);
        }
      }
  
      getData();
    }

  },[currentChatter])

  return (
    <div className="current-chatter">
      <Avatar className="photo" alt="" src={currentChatter?.photoURL}/>
      <div className="current-chatter-info">
        <h2>{currentChatter?.nickname}</h2>
        <p>Status | {isActive ? <b style={{color: "green"}}>Online</b> : <b style={{color: 'red'}}>Offline</b>}</p>
      </div>
    </div>
  )
}
export default CurrentChatter