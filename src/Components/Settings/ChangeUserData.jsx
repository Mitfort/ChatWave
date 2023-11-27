import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { updateEmail, updatePassword, verifyBeforeUpdateEmail } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ChangeUserData = () => {

    const [openEmail,setOpenEmail] = useState(false);
    const [openPassword,setOpenPassword] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const [newEmail,setNewEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");

    const openClose = (changeWhat) => {
        
        switch(changeWhat){

            case "email": {
                setOpenEmail(!openEmail);
                break;
            }
            case "password": {
                setOpenPassword(!openPassword);
                break;
            }

        }

    }

    const handleEmailChange = async(e) => {

        const usersRef = collection(db,"users");
        const q = query(usersRef);
        let czyZajety = false;
        const users = (await getDocs(q)).docs

        if(newEmail.length > 4){

            try{
                users.forEach(user => {

                    if(user.data().email == newEmail){
        
                        alert("Email Juz Zajety");
                        czyZajety = true;
                    }
                })
    
                if(!czyZajety){
                    
                    
                    await verifyBeforeUpdateEmail(currentUser,newEmail)
                    
                    const userRef = doc(db,"users",currentUser.uid);
        
                    await updateDoc(userRef,{
                        email: newEmail
                    })
                    
                    alert("Email has been changed");
                }

                czyZajety = false;
            }
            catch(err){
                console.log(err);
            }
            
        }
        else {
            alert("Email jest za krotki");
        }

        setOpenEmail(false);

    }

    const handlePasswordChange = async(e) => {

        try{
              
            await updatePassword(currentUser,newPassword);
                
            alert("Password has been changed");
        }
        catch(err){
            console.log(err);
        }

        setOpenPassword(false);

    }

  return (
    <div className="changeUserData">

        <Button variant="outlined" color="warning" onClick={() => openClose("email")}>
            Change Email
        </Button>
        
        <Dialog open={openEmail} onClose={() => openClose("email")}>
            <DialogTitle>New Email</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your email address here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    required
                    onChange={(e) => setNewEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => openClose("email")}>Cancel</Button>
                <Button onClick={(e) => handleEmailChange(e)}>Update</Button>
            </DialogActions>
        </Dialog>
        

        <Button variant="outlined" color="warning" onClick={() => openClose("password")}>
            Change Password
        </Button>
        <Dialog open={openPassword} onClose={() => openClose("password")}>
            <DialogTitle>New Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your new password here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="New password"
                    type="password"
                    fullWidth
                    variant="standard"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => openClose("password")}>Cancel</Button>
                <Button onClick={(e) => handlePasswordChange(e)}>Update</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
export default ChangeUserData