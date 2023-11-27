import Options from "./Options"
import ProfilePhoto from "./ProfilePhoto"

const Sidebar = ({setCurrentIndex,currentIndex}) => {
  return (
    <div className="sidebar">
        <ProfilePhoto/>
        <Options setCurrentIndex={setCurrentIndex} currentIndex={currentIndex}/>
    </div>
  )
}
export default Sidebar