import { AppBar, Toolbar, Button, IconButton, ButtonGroup, FormGroup, FormControlLabel, Switch } from '@material-ui/core'
import React from 'react'
import { useRef, useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';

const drawerlStyle = {
  color: '#c2c2c2',
  backgroundColor: '#2f2f2f',
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
          <FormControlLabel control={<Switch defaultChecked color='#535b2f' />} label="Dark Mode" />
          <FormControlLabel control={<Switch color='primary' />} label="AAAA" />
          <FormControlLabel control={<Switch color='primary' />} label="AAAA" />
        </FormGroup>
      </Drawer >
    </>
  );
};

export default Settings;
