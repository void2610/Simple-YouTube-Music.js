import { useRef, useState, useEffect } from "react";
import { FormGroup, FormControlLabel, Switch } from '@mui/material'
import { BlockPicker } from 'react-color';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';

const drawerlStyle = {
  color: '#c2c2c2',
  backgroundColor: '#2f2f2f',
  width: '170px',
};

const Settings = ({ drawerOpened, setDrawerOpened, theme, setTheme }) => {
  const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);

  const handleChangeComplete = (newColor) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      palette: {
        ...prevTheme.palette,
        primary: {
          ...prevTheme.palette.primary,
          main: newColor.hex,
        },
      },
    }));
    setIsOpenColorPicker(false);
  };

  const onDrawerClose = () => {
    setDrawerOpened(false);
    setIsOpenColorPicker(false);
  }

  const onClickColorButton = () => {
    setIsOpenColorPicker(!isOpenColorPicker);
  }




  return (
    <>
      <Drawer
        anchor={'right'}
        open={drawerOpened}
        onClose={() => onDrawerClose()}
        PaperProps={{ style: drawerlStyle }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Settings</p>
        </div>

        <FormGroup style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <FormControlLabel control={<Switch defaultChecked color='primary' />} label="Dark Mode" labelPlacement="start"
            style={{ marginLeft: '-5px' }} />
          <div style={{ marginLeft: '-5px' }}>
            Theme
            <IconButton aria-label="previous song" onClick={() => onClickColorButton()} style={{ color: 'white', boxShadow: 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: theme.palette.primary.main }} />
            </IconButton>
          </div>
        </FormGroup>

        {isOpenColorPicker && (<BlockPicker color={theme.palette.primary.main} onChangeComplete={handleChangeComplete} />)}
      </Drawer >
    </>
  );
};

export default Settings;
