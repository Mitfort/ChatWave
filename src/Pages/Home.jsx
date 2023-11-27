import { useState } from "react"
import Chat from "../Components/Chat/Chat"
import ChatterInfo from "../Components/ChatterInfo/ChatterInfo"
import People from "../Components/People/People"
import Sidebar from "../Components/Sidebar/Sidebar"
import { ChatterContextProvider } from "../Context/ChatterContext"
import { MessagesContextProvider } from "../Context/MessagesContext"
import { FriendsContextProvider } from "../Context/FriendsContext.jsx"
import  Settings  from "./Settings.jsx"
import FriendsRequestMenu from "./FriendsRequestMenu.jsx"

const Home = () => {
  const [currentIndex,setCurrentIndex] = useState(0);
  
  const menus = [
    <ChatMenu key={0}/>,
    <FriendsMenu key={1}/>,
    <ArchieveMenu key={2}/>,
    <SettingsMenu key={3}/>
  ]

  return (
    <ChatterContextProvider>
      <MessagesContextProvider>
        <FriendsContextProvider>
          <div className="home-container">
            <Sidebar setCurrentIndex={setCurrentIndex} currentIndex={currentIndex}/>
            {menus[currentIndex]}
          </div>
        </FriendsContextProvider>
      </MessagesContextProvider>
    </ChatterContextProvider>
  )
}
export default Home

const ChatMenu = () => {
  return (
    <>
      <People/>
      <Chat/>
      <ChatterInfo/>
    </>
  )
}


const FriendsMenu = () => {
  return (
    <>
      <FriendsRequestMenu/>
    </>
  )
}

const ArchieveMenu = () => {
  return (
    <>
      <div className="mozekiedys">
        <h1>Work in Progress....s!</h1>
      </div>
    </>
  )
}

const SettingsMenu = () => {
  return (
    <>
      <Settings/>
    </>
  )
}