import { useContext } from "react"
import ChatterName from "./ChatterName"
import ChatterProfile from "./ChatterProfile"
import ChatterStatus from "./ChatterStatus"
import { ChatterContext } from "../../Context/ChatterContext"

const ChatterInfo = () => {

  const {currentChatter} = useContext(ChatterContext);

  return (
    <div className="chatter-info">
        <div className="chatter-info-title">
            <h2>Profile Info</h2>
        </div>
        <div className="info">
            <ChatterProfile/>
            <ChatterName fname={currentChatter?.first_name} lname={currentChatter?.last_name}/>
            <ChatterStatus/>
        </div>
    </div>
  )
}
export default ChatterInfo