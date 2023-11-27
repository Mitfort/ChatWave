import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ArchiveIcon from '@mui/icons-material/Archive';
import PeopleIcon from '@mui/icons-material/People';
import { List, ListItemButton } from '@mui/material';


const Options = ({setCurrentIndex,currentIndex}) => {
  const handleIndexChange = (index) =>{
    setCurrentIndex(index);
  }
  
  return (
    <div className="options">
      <List>
        <ListItemButton className='button' 
          selected={currentIndex == 0} 
          onClick={() => handleIndexChange(0)}>
          <ChatIcon style={{width: '100%', height: '100%'}}/>
        </ListItemButton>
        <ListItemButton className='button' selected={currentIndex == 1} onClick={() => handleIndexChange(1)}>
          <PeopleIcon style={{width: '100%', height: '100%'}}/>
        </ListItemButton>
        <ListItemButton className='button' selected={currentIndex == 2} onClick={() => handleIndexChange(2)}>
          <ArchiveIcon style={{width: '100%', height: '100%'}}/>
        </ListItemButton>
        <ListItemButton className='button' selected={currentIndex == 3} onClick={() => handleIndexChange(3)}>
          <SettingsIcon style={{width: '100%', height: '100%'}}/>
        </ListItemButton>
      </List>
    </div>
  )
}
export default Options