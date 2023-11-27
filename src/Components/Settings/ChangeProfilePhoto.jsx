import { useContext, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { Avatar, Popover,Button } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const ChangeProfilePhoto = () => {
    const {currentUser} = useContext(AuthContext);
    const [newImage,setNewImage] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    }; 

    const handleSubmit = async() => {        
        if(newImage != null){
            if(newImage.name.match(/\.(jpg|jpeg|png|gif)$/i)){

                try{
                    const profileImagesRef = ref(storage,`profileImages/${currentUser.uid}`);

                    const uploadTask = uploadBytesResumable(profileImagesRef, newImage);

                    uploadTask.on(
                        (err) => console.log(err),
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                await updateProfile(currentUser,{
                                    photoURL: downloadURL
                                })

                                const docRef = doc(db, "users", currentUser.uid);
                                
                                await updateDoc(docRef,{
                                  photoURL: downloadURL
                                });

                            });
                        }
                    )
                }
                catch(err){
                    console.log(err);
                }
            }
            else{
                console.log("NOT Image");
            }
        }
    }

  return (
    <div className="change-profile-photo">
        <Avatar src={currentUser.photoURL} style={{width: '100px', height: '100px', marginRight: '20px'} }/>
        <Button variant="contained" color="warning" onClick={handleClick}>
              Change Photo Image
        </Button>
        <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h6>CHOOSE PHOTO</h6>
          {/* <form onSubmit={(e) => handleSubmit(e)}> */}
            <input type="file" name="changedPhoto" id="" onChange={(e) => setNewImage(e.target.files[0])}/>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          {/* </form> */}
        </div>
      </Popover>

    </div>
  )
}


export default ChangeProfilePhoto