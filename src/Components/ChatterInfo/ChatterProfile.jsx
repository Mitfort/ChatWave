import { Avatar } from "@mui/material"
import { useContext } from "react"
import { ChatterContext } from "../../Context/ChatterContext"

const ChatterProfile = () => {
  const {currentChatter} = useContext(ChatterContext)

  return (
    <div className="chatter-profile">
      <Avatar src={currentChatter?.photoURL} style={{height: "100px", width: "100px"}}></Avatar>
    </div>
  )
}
export default ChatterProfile