import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Avatar from '@mui/material/Avatar';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const ProfilePhoto = () => {
  const {currentUser,setCurrentUser} = useContext(AuthContext);
  const [displayMenu,setDisplayMenu] = useState(false);

  const handleLogOut = async() => {
    try{
      if(currentUser){
        console.log("USUN");
        deleteDoc(doc(db,"activeUsers",currentUser.uid));
        setCurrentUser(null);
      }

      await signOut(auth);
      // window.location.href = "/";
    }
    catch(err){
      console.log(err);
    }
  }
  
  return (
    <div className="profile-photo">
        <div className='group-photo'>
          <Avatar className="photo" alt={currentUser?.displayName} src={currentUser.photoURL} />
          <div className='status'></div>
        </div>
        

        <div className="profile-name" onClick={() => {console.log(currentUser)}}>
            <button><ExpandMoreOutlinedIcon style={{width: '20px',height: '20px'}} onClick={() => setDisplayMenu(!displayMenu)}/></button>
        </div>

        {displayMenu ? 
          <div className='menu-logout'>
              <button onClick={handleLogOut}>LOGOUT</button>
              <button onClick={() => console.log(currentUser)}>Info</button>
          </div>
        : <></>
        }
    </div>
  )
}
export default ProfilePhoto