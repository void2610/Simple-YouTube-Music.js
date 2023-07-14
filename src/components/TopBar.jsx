import { IconButton } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';

// const useStyles = makeStyles({
//   iconButton: {
//     '&:hover': {
//       backgroundColor: '#272727'
//     }
//   }
// });


const TopBar = ({ isDisplayTrack, setIsDisplayTrack, drawerOpened, setDrawerOpened }) => {

  const trackButtonClick = () => {
    setIsDisplayTrack(true);
  }
  const historyButtonClick = () => {
    setIsDisplayTrack(false);
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '-5px' }}>
        <Box sx={{ width: '100%' }}>
          <Tabs
            onChange={handleChange}
            value={value}
            aria-label="Tabs where selection follows focus"
            selectionFollowsFocus
            sx={{ width: '100%', height: '20px', minHeight: '40px', }}
          >
            <Tab label="Track" sx={{ width: '50%', color: '#c2c2c2', minHeight: '40px' }}
              onClick={trackButtonClick}
              icon={<QueueMusicIcon />} iconPosition="start" />
            <Tab label="History" sx={{ width: '50%', color: '#c2c2c2', minHeight: '40px' }}
              onClick={historyButtonClick}
              icon={<HistoryIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        < IconButton style={{ color: 'white', boxShadow: 'none', marginLeft: '12px' }} onClick={() => { setDrawerOpened(true); }}>
          <SettingsIcon style={{ color: '#c2c2c2' }} />
        </ IconButton>
      </div >
    </>
  );
};

export default TopBar;
