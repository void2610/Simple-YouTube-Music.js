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

  const onChangeMode = (newMode) => {
    const mode = newMode ? 'dark' : 'light';
    console.log(mode);
    setTheme((prevTheme) => ({
      ...prevTheme,
      palette: {
        ...prevTheme.palette,
        mode: mode,
        secondary: {
          main: '#f50057',
        },
        background: {
          paper: mode === 'dark' ? '#424242' : '#ffffff', // ダークモードかライトモードによって背景色を変更
          default: mode === 'dark' ? '#121212' : '#f5f5f5', // ダークモードかライトモードによってデフォルトの背景色を変更
        },
        text: {
          primary: mode === 'dark' ? '#ffffff' : '#000000', // ダークモードかライトモードによってテキストのプライマリカラーを変更
          secondary: '#616161', // セカンダリカラーは常に同じ
        },
      },
    }));
    console.log(theme.palette.mode);
  };

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
          <FormControlLabel control={<Switch defaultChecked color='primary' onChange={(event) => onChangeMode(event.target.checked)} />} label="Dark Mode" labelPlacement="start"
            style={{ marginLeft: '-5px' }} />
          <div style={{ marginLeft: '-5px' }}>
            Theme
            <IconButton aria-label="previous song" onClick={() => onClickColorButton()} style={{ color: 'white', boxShadow: 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: theme.palette.primary.main }} />
            </IconButton>
          </div>
        </FormGroup>

        {isOpenColorPicker && (<BlockPicker color={theme.palette.primary.main} onChangeComplete={handleChangeComplete}
          styles={{
            default: {
              input: {
                backgroundColor: '#2f2f2f',
                color: '#c2c2c2',
              },
            }
          }}
          colors={['#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#5c6bc0', '#42a5f5', '#29b6f6', '#26c6da', '#26a69a', '#66bb6a', '#9ccc65', '#d4e157', '#ffee58', '#ffca28', '#ffa726', '#ff7043', '#8d6e63', '#bdbdbd', '#78909c', '#535bf2']}
        />)}
      </Drawer >
    </>
  );
};

export default Settings;
