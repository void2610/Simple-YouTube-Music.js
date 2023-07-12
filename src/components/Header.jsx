import { AppBar, Toolbar, makeStyles } from '@material-ui/core'
import React from 'react'

import GamepadIcon from '@mui/icons-material/Gamepad';

const useStyles = makeStyles(() => ({
  header: {
    flex: 1
  }
}));

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <h2 className={classes.header}>Simple Youtube Player</h2>
        <GamepadIcon />
      </Toolbar>
    </AppBar>
  )
}

export default Header

