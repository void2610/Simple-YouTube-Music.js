import { AppBar, Toolbar, makeStyles, Button, IconButton, ButtonGroup, FormGroup, FormControlLabel, Switch } from '@material-ui/core'
import React from 'react'
import { useRef, useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';

const drawerlStyle = {
  color: '#c2c2c2',
  backgroundColor: '#2f2f2f',
  WebkitTextSizeAdjust: '100%',
  width: '190px'
};


const Settings = ({ drawerOpened, setDrawerOpened }) => {

  return (
    <>
      <Drawer
        anchor={'right'}
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        PaperProps={{ style: drawerlStyle }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Settings</p>
        </div>

        <FormGroup style={{ marginLeft: '20px' }}>
          <FormControlLabel control={<Switch defaultChecked />} label="Dark Mode" />
          <FormControlLabel control={<Switch />} label="AAAA" />
          <FormControlLabel control={<Switch />} label="AAAA" />
        </FormGroup>
      </Drawer >
    </>
  );
};

export default Settings;
