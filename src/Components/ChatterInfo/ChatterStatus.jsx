import { useContext } from "react"
import { ChatterContext } from "../../Context/ChatterContext"

const ChatterStatus = () => {
  const {currentChatter} = useContext(ChatterContext);

  const getDate = (birthday) => {
    const mili = new Date() - new Date(birthday);

    const age = new Date(mili);

    return(age.getUTCFullYear() - 1970);
}

  return (
    <div className="chatter-status">

      <p style={{textAlign: 'left', width: '80%'}}><b>Email:</b> {currentChatter?.email}</p> <br />

      <p style={{textAlign: 'left', width: '80%'}}><b>Birthday:</b> {currentChatter?.birthday}</p> <br />

      <p style={{textAlign: 'left', width: '80%'}}><b>Age:</b> {getDate(currentChatter?.birthday)}</p> 

    </div>
  )
}
export default ChatterStatus