import { collection, doc, getDoc, onSnapshot, query, updateDoc,  } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';
import { Alert, Autocomplete, Avatar, Box, Snackbar, TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const SearchFor = ({searchedFriend,setSearchedFriend}) => {
    const [foundUser,setFoundUser] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const [users,setUsers] = useState([]);
    const [addFriendPopUp,setAddFriendPopUp] = useState(false);

    const usersRef = collection(db,"users");

    useEffect(() => {

        const getData = () => {
            
            let people = [];
            const q = query(usersRef);

            const unsub = onSnapshot(q, (snapshot) => {
                
                snapshot.forEach(person => {
                    people.push({...person.data()});
                });

                const finalData = people.filter(person => person.userID != currentUser.uid);

                setUsers(finalData);
            })

            return () => {
                unsub();
            }
        };

        currentUser.uid && getData();

    },[])

    useEffect(() => {

    }, [searchedFriend])

    const handleSearch = (userFullName) => {
        let searched = null;
        try {
            searched = users.filter(user => `${user.first_name} ${user.last_name}` == userFullName);
            setSearchedFriend(searched[0]);
        }
        catch(err){
            console.log(err);
        }

    }

    const getDate = (birthday) => {
        const mili = new Date() - new Date(birthday);

        const age = new Date(mili);

        return(age.getUTCFullYear() - 1970);
    }

    const handleSendInvitation = async() => {
        const userRef = doc(db,"users",searchedFriend.userID);

        let userToUpdate = await getDoc(userRef);
        let isKnown = false;

        userToUpdate.data().friends.forEach(friend => {
            if(friend == currentUser.uid){
                isKnown = true;
                alert("Juz sie znamy :D");
            }
        })

        if(isKnown){
            return;
        }


        let invitations = searchedFriend.invitations;
        let invitation = {
            from: currentUser.uid,
            sent: new Date()
        }

        invitations.push({invitation})

        await updateDoc(userRef,{
            invitations: invitations
        })

        setAddFriendPopUp(true);
    }

    const handleRemoveFriend = async(userID) => {
        let userRef = doc(db, 'users', currentUser.uid);
        let userToUpdate = await getDoc(userRef);
    
        if(userToUpdate.data().friends.includes(userID)){
    
          let newFriends = userToUpdate.data().friends.filter(friend => friend != userID)
    
          await updateDoc(userRef, {
            friends: [...newFriends]
          })
    
    
          let secondUser = doc(db,"users",userID);
          userToUpdate = await getDoc(secondUser);
    
          let secondNewFriends = userToUpdate.data().friends.filter(friend => friend != currentUser.uid);
    
          await updateDoc(secondUser,{
            friends: [...secondNewFriends]
          })
    
          alert(`${userToUpdate.data().first_name} has been removed from friends :{`);
    }}

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAddFriendPopUp(false);
      };
    

    return (
        <>
        <div className="search">
          {/* <input type="text" name="" id="searchInput" placeholder='Enter for search' onInput={(e) => handleSearching(e)}/> */}
          <Autocomplete
            onInputChange={(event,newInputValue) => {
            handleSearch(newInputValue);
            setFoundUser(true);
            }}
            id="selectUser"
            sx={{ width: 300 }}
            options={users}
            autoHighlight
            getOptionLabel={(user) => `${user.first_name} ${user.last_name}`}
            renderOption={(props, user) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                    loading="lazy"
                    width="20"
                    // srcSet={user.}
                    src={user.photoURL}
                    alt=""
                    />
                    {user.first_name} {user.last_name}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Enter for search"
                inputProps={{
                    ...params.inputProps,
                }}
                />
            )}
        />

        </div>

        {foundUser && searchedFriend?.userID &&
            
            <div className='searchedUserInfo'>
                <Avatar src={searchedFriend?.photoURL} style={{width:'200px', height:'200px'}}/>
                <div className='informations'>
                    <h2>{searchedFriend.first_name} {searchedFriend.last_name}</h2>
                    <p>Email: {searchedFriend.email}</p>
                    <p>Born: {searchedFriend.birthday}</p>
                    <p>Age: {getDate(searchedFriend.birthday)}</p>
                </div>
                <div className='operations'>
                    <button onClick={handleSendInvitation}><PersonAddIcon/></button>
                    <Snackbar open={addFriendPopUp} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Succesfully sent invitation :D
                        </Alert>
                    </Snackbar>
                    <button onClick={() => handleRemoveFriend(searchedFriend.userID)}><PersonRemoveIcon/></button>
                </div>
            </div>
        } 
        </>
    )
}
export default SearchFor