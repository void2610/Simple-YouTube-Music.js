import { AppBar, Toolbar, makeStyles, Button, IconButton, ButtonGroup } from '@material-ui/core'
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
  backgroundColor: '#2f2f2f',
  fontSynthesis: 'none',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  WebkitTextSizeAdjust: '100%',
  border: 'none',
  width: '170px'
};

const activeButtonStyle = {
  backgroundColor: '#3f51b5',
  color: 'white'
};

const useStyles = makeStyles({
  iconButton: {
    '&:hover': {
      backgroundColor: '#272727'
    }
  }
});


const TopBar = ({ isDisplayTrack, setIsDisplayTrack }) => {
  const classes = useStyles();

  const [drawerOpened, setDrawerOpened] = useState(false);

  const trackButtonClick = () => {
    setIsDisplayTrack(true);
  }
  const historyButtonClick = () => {
    setIsDisplayTrack(false);
  }


  return (
    <>
      <ButtonGroup variant="contained" aria-label="outlined button group" size="large" style={{ width: '93.06%' }}>
        <Button variant="outlined" startIcon={<QueueMusicIcon />} style={{
          ...{ color: '#c2c2c2', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
          ...(isDisplayTrack ? activeButtonStyle : {})
        }} onClick={trackButtonClick}>Tracks</Button>
        <Button variant="outlined" startIcon={<HistoryIcon />} style={{
          ...{ color: '#c2c2c2', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
          ...(!isDisplayTrack ? activeButtonStyle : {})
        }} onClick={historyButtonClick}>History</Button>
      </ButtonGroup >
      < IconButton className={classes.iconButton} style={{ color: 'white', boxShadow: 'none', marginTop: '-15px', marginLeft: '13.3px' }} onClick={() => { setDrawerOpened(true); }}>
        <MoreVertIcon />
      </ IconButton>



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
