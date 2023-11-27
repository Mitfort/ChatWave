import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { ChatterContext } from '../../Context/ChatterContext';
import { FieldValue, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { MessagesContext } from '../../Context/MessagesContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const Textbar = () => {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const {currentChatter} = useContext(ChatterContext);
  const {currentUser} = useContext(AuthContext);
  const {messages} = useContext(MessagesContext);
  const [isFocued, setIsFocused] = useState(false);
  const [link,setLink] = useState("");

  const handleSubmit = async() => { 
    const combinedID = currentChatter?.userID > currentUser.uid ? currentChatter?.userID + currentUser.uid : currentUser.uid + currentChatter?.userID;
  
    try{
      const messagesRef = await getDoc(doc(db,"chats",combinedID));
      let messagesData = messagesRef.data().messages;
      let newData = {message: "",from:"",img:"",sent:null};
      let imgURL = "";

      if(file != null){
        console.log("jest plik")
        if(file.name.match(/\.(jpg|jpeg|png|gif)$/i)){

          console.log("i sprawdza sie");
            try{
                const messageImageRef = ref(storage,`${combinedID}/${file.name}`);

                const uploadTask = uploadBytesResumable(messageImageRef, file);

                uploadTask.on(
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                          imgURL = downloadURL;
                          setLink(downloadURL);
                          newData.img = downloadURL;
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

      newData.message = message;
      newData.from = currentUser.uid;
      newData.img = link;
      newData.sent = new Date();
      
      if(newData.message != "" || newData.img != ""){
        messagesData.push(newData);
      
        await updateDoc(doc(db,"chats",combinedID), {
          messages: messagesData,
          last_message: newData
        });
      }

      setMessage("");
      setFile(null);
      setLink("");

    }
    catch(err){
      console.log(err);
    }
    
  }

  const handleCheckMessage = (e) => {
    if(e.target.value == "" && isFocued) return ;

    setMessage(e.target.value);
  }

  const handleFileCheck = (e) => {
    if(!e.target.files[0]) return;

    setFile(e.target.files[0]);
  }

  return (
    <div className="textbar">
      <div className='message-form'>
        <textarea type="text" value={message} name="" id="" wrap='soft' onInput={(e) => handleCheckMessage(e)}/>
        
        <div className='send'>
          <input style={{display: 'none'}} type="file" name="file" id="file" onChange={(e) => handleFileCheck(e)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
          <label htmlFor="file" className='send-img'>
            <ImageIcon/>
          </label>
          
          <button onClick={handleSubmit}><SendIcon/></button>
        </div>
      </div>
    </div>
  )
}
export default Textbar