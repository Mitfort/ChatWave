import { createContext, useState } from "react"

export const ChatterContext = createContext();

export const ChatterContextProvider = ({children}) => {
  
    const [currentChatter,setCurrentChatter] = useState(null);  

    return (
        <ChatterContext.Provider value={{currentChatter,setCurrentChatter}}>
            {children}
        </ChatterContext.Provider>
  )
}