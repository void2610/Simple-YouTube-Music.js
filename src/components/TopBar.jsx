import { AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core'
import React from 'react'
import { useRef, useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HistoryIcon from '@mui/icons-material/History';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const drawerlStyle = {
  fontFamily: "'Inter', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'",
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
  color: '#f6f6f6',
  backgroundColor: '#0f0f0f',
  fontSynthesis: 'none',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  WebkitTextSizeAdjust: '100%',
  border: 'none',
  width: '170px'
};


const TopBar = ({ setIsDisplayTrack }) => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const trackButtonClick = () => {
    setIsDisplayTrack(true);
  }
  const historyButtonClick = () => {
    setIsDisplayTrack(false);
  }


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ width: '49.5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={trackButtonClick}><QueueMusicIcon /> Tracks</button>
        <button style={{ width: '49.5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={historyButtonClick}><HistoryIcon />History</button>
        < IconButton style={{ color: 'white', boxShadow: 'none' }} onClick={() => { setDrawerOpened(true); }}>
          <MoreVertIcon style={{ fontSize: '2rem' }} />
        </ IconButton>
      </div >

      <Drawer
        anchor={'right'}
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        PaperProps={{ style: drawerlStyle }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Settings</p>
        </div>
      </Drawer >
    </>
  );
};

export default TopBar;
