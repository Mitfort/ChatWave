import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"
import { ChatterContext } from "./ChatterContext";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

export const MessagesContext = createContext();

export const MessagesContextProvider = ({children}) => {

    const [messages,setMessages] = useState([]);
    const {currentChatter} = useContext(ChatterContext);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {

        const getData = () => {
            
            const combinedID = currentChatter?.userID > currentUser.uid ? currentChatter?.userID + currentUser.uid : currentUser.uid + currentChatter?.userID;
        
            const messagesRef = collection(db,"chats");
            const q = query(messagesRef, where(documentId(),"==",combinedID));
            
            const unsub = onSnapshot(q,(snapshot) => {

                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push(doc.data());
                });

                setMessages(messages[0].messages);
            });
    
            return () => {
                unsub();
            }
        }
        
        currentChatter?.userID && getData();

    },[currentChatter?.userID])
  
    return (
    <MessagesContext.Provider value={{messages,setMessages}}>
        {children}
    </MessagesContext.Provider>
  )
}