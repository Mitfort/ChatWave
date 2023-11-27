import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { collection, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useState,useContext,useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import { Avatar } from '@mui/material';
import { FriendsContext } from '../../Context/FriendsContext';

const FriendsInvitations = ({ setSearchedFriend }) => {
  const [friendsInvitations, setFriendsInvitations] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const usersRef = collection(db, "users");
  const [displayData,setDisplayData] = useState([]);
  const {setCurrentFriends} = useContext(FriendsContext);

  useEffect(() => {
    const q = query(usersRef, where("userID", "==", currentUser.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      let invitations = [];

      snapshot.forEach((doc) => {
        doc.data().invitations.forEach((invitation) => {
          invitations.push(invitation.invitation);
        });
      });

      let finalData = invitations.sort((a, b) => a - b);
      setFriendsInvitations(finalData);
    });

    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  const handleSelect = (userID) => {
    setSearchedFriend(userID);
  };

  const handleAddFriend = async (newFriend) => {
    let userRef = doc(db, 'users', currentUser.uid);

    let userToUpdate = await getDoc(userRef);

    let friends = [];
    let invitations = [];

    userToUpdate.data().friends.forEach(friend => {
      friends.push(friend);
    })

    userToUpdate.data().invitations.forEach(invitation => {
      if(invitation.invitation.from != newFriend){
        invitations.push(invitation.invitation);
      }
    })

    setCurrentFriends(friends);

    if(friends.includes(newFriend)){
      alert("JUZ SIE ZNACIE");
      return;
    }

    await updateDoc(userRef, {
      friends: [newFriend,...friends],
      invitations: invitations
    })

    userRef = doc(db,"users",newFriend);

    userToUpdate = await getDoc(userRef);

    friends = [];

    newFriend = currentUser.uid;

    userToUpdate.data().friends.forEach(friend => {
      friends.push(friend);
    })

    if(!friends.includes(newFriend)){
      await updateDoc(userRef, {
        friends: [newFriend,...friends]
      })
    }
  };

  const handleRemoveInvitation = async (userID) => {
    let userRef = doc(db, 'users', currentUser.uid);
    let userToUpdate = await getDoc(userRef);
    let invFound = false;

    userToUpdate.data().invitations.forEach(inv => {
      if(inv.invitation.from == userID){
        invFound = true;
      }
    })

    if(invFound){
      let newFriends = userToUpdate.data().invitations.filter(inv => inv.invitation.from != userID)

      await updateDoc(userRef, {
        invitations: [...newFriends]
      })
  
  
      let secondUser = doc(db,"users",userID);
      userToUpdate = await getDoc(secondUser);
  
      let secondNewFriends = userToUpdate.data().invitations.filter(inv => inv.invitation.from != currentUser.uid);
  
      await updateDoc(secondUser,{
        invitations: [...secondNewFriends]
      })
    }
  };

  const getUser = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const data = await getDoc(userRef);
    return data.data();
  };

  useEffect(() => {
    const fetchData = async () => {
      const userDataPromises = friendsInvitations.map((invitation) =>
        getUser(invitation.from)
      );

      const userData = await Promise.all(userDataPromises);
      setDisplayData(userData);
    };

    fetchData();
  }, [friendsInvitations]);

  return (
    <div className="invitations">
      {displayData.length == 0 && <h2>You have 0 invitations</h2>}
      {displayData.map((user, index) => (
        <div
          className="invitation"
          key={index}
          style={{ display: 'flex' }}
          onClick={() => handleSelect(user.userID)}
        >
          <Avatar src={user.photoURL} alt={user.displayName}/>
          <p>{user.first_name} {user.last_name}</p>
          <p style={{marginLeft: 'auto'}}>Add</p>
          <button onClick={() => handleAddFriend(user.userID)}>
            <PersonAddIcon />
          </button>
          <p>Remove</p>
          <button onClick={() => handleRemoveInvitation(user.userID)}>
            <PersonRemoveIcon />
          </button>
        </div>
      ))}
    </div>
  );
};
export default FriendsInvitations