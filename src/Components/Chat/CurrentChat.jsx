import { useContext, useEffect, useRef } from "react";
import { MessagesContext } from "../../Context/MessagesContext";
import { AuthContext } from "../../Context/AuthContext";

const CurrentChat = () => {
  const {messages} = useContext(MessagesContext);
  const {currentUser} = useContext(AuthContext);
  const latestDataRef = useRef(null);
  const scrollableChatRef = useRef(null);

  useEffect(() => {
    const scrollableChat = scrollableChatRef.current;
    const latestData = latestDataRef.current;
    
    if(scrollableChat && latestData){
      scrollableChat.scrollTop = latestData.offsetTop;
    }
  },[messages])
  
  return (
    <div className="current-chat" ref={scrollableChatRef}>
      {messages.map((message,index) => {
        if(index != messages.length - 1 ){
          return <div className={
            message.from ==  currentUser.uid ? "my-message" : "message"} 
            key={index} 
            >
              {message.message}
              {message.img &&  <img src={message.img} style={{width: '100%', height: '100%'}} alt="123"/>}

            </div>
        }
        else {
          return <div className={
            message.from ==  currentUser.uid ? "my-message" : "message"} 
            key={index} 
            ref={latestDataRef}
            >
              {message.message}
              {message.img &&  <img src={message.img} style={{width: '100%', height: '100%'}}alt="123"/>}
            </div>
        }
      })}
    </div>
  )
}
export default CurrentChat