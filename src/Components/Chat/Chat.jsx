import CurrentChat from "./CurrentChat"
import CurrentChatter from "./CurrentChatter"
import Textbar from "./Textbar"

const Chat = () => {
  return (
    <div className="chat">
        <CurrentChatter/>
        <CurrentChat/>
        <Textbar/>
    </div>
  )
}
export default Chat