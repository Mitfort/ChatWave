import { useState } from "react"
import Friends from "./Friends"
import Search from "./Search"

const People = () => {
  const [searchedFriend,setSearchedFriend] = useState("");

  return (
    <div className="people">
        <Search setSearchedFriend={setSearchedFriend}/>
        <Friends searchedFriend={searchedFriend}/>
    </div>
  )
}
export default People