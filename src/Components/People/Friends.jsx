import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Context/AuthContext";
import { collection, doc, getDoc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { ChatterContext } from "../../Context/ChatterContext";
import { MessagesContext } from "../../Context/MessagesContext";

const Friends = ({searchedFriend}) => {

  const usersRef = collection(db,"users");
  const chatsRef = collection(db,"chats");

  const [friends,setFriends] = useState([]);
  const [searchingFor, setSearchingFor] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {currentChatter,setCurrentChatter} = useContext(ChatterContext);
  const {messages,setMessages} = useContext(MessagesContext);
  const [lastMessages, setLastMessages] = useState({});
  // const [sortedFriends,setSortedFriends] = useState([]);

  // useEffect(() => {

  //   const q = query(usersRef);
    
  //   onSnapshot(q,(doc) => {
  //     let friends = [];
  //     doc.forEach(friend => {
  //       friends.push({...friend.data()});
  //     });

  //     friends = friends.filter(friend => friend.userID != currentUser.uid);
  //     setFriends(friends);
  //   })

  // },[])

  useEffect(() => {

    if(!currentUser.uid){
      return;
    }

    const q = query(usersRef, where("userID", "==", currentUser.uid));
    
    const unsub = onSnapshot(q,(snapshot) => {
      let friends = [];
      
      snapshot.forEach(doc => {
        doc.data().friends.forEach(friend => {
          friends.push(friend);
        })
      });

      const q2 = query(usersRef);

      const unsub2 = onSnapshot(q2, (snapshot) => {
        let people = [];

        snapshot.forEach(doc => {
          if(friends.includes(doc.data().userID)){
            people.push(doc.data());
          }
        })

        people = people.filter(person => person.userID != currentUser.uid);
        
        setFriends(people);

        people.forEach((friend) => {
          displayLastMessage(friend.userID,friend.first_name);
        });
      })

      return () => {
        unsub2();
      }

    })

    return () => {
      unsub();
    }

  },[messages])


  useEffect(() => {
    setSearchingFor(friends.filter(friend => String(friend.first_name).toLowerCase().includes(searchedFriend.toLowerCase()) || String(friend.last_name).toLowerCase().includes(searchedFriend.toLowerCase())));
  }, [searchedFriend])
  
  const handleSelect = async (userID) => {
    
    const user = friends.find(friend => friend.userID == userID);
    
    if(user == null){
      return;
    }

    const combinedID = user.userID > currentUser.uid ? user.userID + currentUser.uid : currentUser.uid + user.userID;

    try{
      const chats = await getDoc(doc(db,"chats",combinedID));

      if(!chats.exists()){
        await setDoc(doc(db,"chats",combinedID),{messages: [], last_message: null});

        const snapshot = await getDoc(doc(db,"chats",combinedID));
        
        await setCurrentChatter(user);
        await setMessages(snapshot.data().messages);
      }
      else {
        const snapshot = await getDoc(doc(db,"chats",combinedID));
        
        await setCurrentChatter(user);
        await setMessages(snapshot.data().messages);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const displayLastMessage = async (friendID,friendName) => {
    const combinedID = friendID > currentUser.uid ? friendID + currentUser.uid : currentUser.uid + friendID;

    try {
      const chat = await getDoc(doc(db, "chats", combinedID));

      if (chat.exists()) {
        const lastMessage = chat.data()?.last_message?.message.toString().substring(0,10);
        const sent = chat.data()?.last_message?.sent;
        let from = chat.data()?.last_message?.from;
        
        from == friendID ? from = friendName : from = "Ty";

        setLastMessages((prev) => ({ ...prev, [friendID]: {lastMessage,from,sent} }));
      }
    } catch (err) {
      console.log(err);
    }
  
  };


  const sortedFriends = friends.slice().sort((a,b) => {

    const f1 = lastMessages[b.userID]?.sent;
    const f2 = lastMessages[a.userID]?.sent;

    if(!f1){
      return -1;
    }

    if(f1 > f2){
      return 1;
    }

    if(f1 < f2){
      return -1;
    }

    return 0;

  });

  return (
    <div className="friends">
      {
        searchedFriend.length == 0 ? (
          sortedFriends.map(friend => {
            return (
              <div className="friend" key={friend.userID} onClick={() => handleSelect(friend.userID)}>
                <p>{friend.first_name} {friend.last_name}</p>
                {lastMessages[friend.userID] && <p className="last_message">{lastMessages[friend.userID]?.from}: {lastMessages[friend.userID]?.lastMessage}</p>}
              </div>
            )
            })):
        (
          searchingFor.map(friend => {
            return (
              <div className="friend" key={friend.userID} onClick={() => handleSelect(friend.userID)}>
                <p>{friend.first_name} {friend.last_name}</p>
                {lastMessages[friend.userID] && <p className="last_message">{lastMessages[friend.userID]?.from}: {lastMessages[friend.userID]?.lastMessage}</p>}
              </div>
            )
          })
        )
      
     
      }
    </div>
  )

}
export default Friends