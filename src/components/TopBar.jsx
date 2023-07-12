import { AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core'
import React from 'react'

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HistoryIcon from '@mui/icons-material/History';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TopBar = ({ setIsDisplayTrack }) => {
  const trackButtonClick = () => {
    setIsDisplayTrack(true);
  }
  const historyButtonClick = () => {
    setIsDisplayTrack(false);
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button style={{ width: '49.5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={trackButtonClick}><QueueMusicIcon /> Tracks</button>
      <button style={{ width: '49.5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={historyButtonClick}><HistoryIcon />History</button>
      < IconButton style={{ color: 'white', boxShadow: 'none' }}>
        <MoreVertIcon style={{ fontSize: '2rem' }} />
      </ IconButton>
    </div >
  );
};

export default TopBar;
