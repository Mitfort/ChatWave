import { createContext, useState } from "react";


export const FriendsContext = createContext();

export const FriendsContextProvider = ({children}) => {
    const [currentFriends,setCurrentFriends] = useState([]);


    return (
        <FriendsContext.Provider value={{currentFriends,setCurrentFriends}}>
            {children}
        </FriendsContext.Provider>
    );
}