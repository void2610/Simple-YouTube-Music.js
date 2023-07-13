import { AppBar, Toolbar, makeStyles, Button, IconButton, ButtonGroup } from '@material-ui/core'
import React from 'react'
import { useRef, useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HistoryIcon from '@mui/icons-material/History';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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


const TopBar = ({ isDisplayTrack, setIsDisplayTrack, drawerOpened, setDrawerOpened }) => {
  const classes = useStyles();



  const trackButtonClick = () => {
    setIsDisplayTrack(true);
  }
  const historyButtonClick = () => {
    setIsDisplayTrack(false);
  }


  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '-5px' }}>
        <ButtonGroup variant="text" aria-label="outlined button group" size="large" style={{ width: '93.16%' }}>
          <Button variant="outlined" startIcon={<QueueMusicIcon />} style={{
            ...{ color: '#c2c2c2', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
            ...(isDisplayTrack ? activeButtonStyle : {})
          }} onClick={trackButtonClick}>Tracks</Button>
          <Button variant="outlined" startIcon={<HistoryIcon />} style={{
            ...{ color: '#c2c2c2', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
            ...(!isDisplayTrack ? activeButtonStyle : {})
          }} onClick={historyButtonClick}>History</Button>
        </ButtonGroup >
        < IconButton className={classes.iconButton} style={{ color: 'white', boxShadow: 'none', marginLeft: '12px' }} onClick={() => { setDrawerOpened(true); }}>
          <MoreVertIcon />
        </ IconButton>
      </div >

    </>
  );
};

export default TopBar;
