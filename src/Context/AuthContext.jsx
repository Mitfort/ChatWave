import { createContext, useEffect, useState } from "react";
import {auth, db} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {deleteDoc, doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    const [isLogged,setIsLogged] = useState(false);

    useEffect( () => {
        const unsub = onAuthStateChanged(auth,(user) => {

                if(user){
                    setCurrentUser(user);
                    setDoc(doc(db,"activeUsers",user.uid),{
                        id: user.uid
                    })

                    setIsLogged(true);
                }
                else{
                    deleteDoc(doc(db,"activeUsers",user?.uid));
                    setCurrentUser(null);
                    setIsLogged(false);
                }
        });

        return () => {
            unsub();
        }

    }, []);

    return (
        <AuthContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    );
}