import { useState } from "react";
import FriendsInvitations from "../Components/FriendsMenu/FriendsInvitations";
import SearchFor from "../Components/FriendsMenu/SearchFor";

const FriendsRequestMenu = () => {

    const [searchedFriend,setSearchedFriend] = useState("");

  return (
    <div className="friends-request-menu">
        <div className="requests">
            <h1>FRIENDS INVITATIONS</h1>
            <FriendsInvitations setSearchedFriend={setSearchedFriend}/>
        </div>

        <div className="searchMenu">
            <h1>SEARCH FOR A PERSON</h1>
            <SearchFor setSearchedFriend={setSearchedFriend} searchedFriend={searchedFriend}/>
        </div>
    </div>
  )
}
export default FriendsRequestMenu