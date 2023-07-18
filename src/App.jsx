import { useRef, useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { invoke } from "@tauri-apps/api/tauri";
import DisplayTrack from "./components/DisplayTrack";
import Controls from "./components/Controls";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import PlayList from "./components/PlayList";
import History from "./components/History";
import Settings from "./components/Settings";

const App = () => {
  //localStorage.removeItem('theme');

  // テーマの設定
  const firstTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#535bf2',
      },
    },
  })

  const [theme, setTheme] = useState(firstTheme);

  // ローカルストレージから履歴データを取得
  const savedHistories = localStorage.getItem('histories');
  const [histories, setHistories] = useState(savedHistories ? JSON.parse(savedHistories) : []);

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isDisplayTrack, setIsDisplayTrack] = useState(true);
  const savedTheme = localStorage.getItem('theme');
  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const playerRef = useRef();

  useEffect(() => {

    if (savedTheme) {
      const newTheme = createTheme(JSON.parse(savedTheme));
      setTheme(newTheme);
    }
  }, []);

  // 履歴データが更新されたときにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('histories', JSON.stringify(histories));
  }, [histories]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  //Rustコマンド
  async function calc() {
    const num1 = 2;
    const num2 = 3;
    try {
      const result = await invoke('calc', { num1, num2 });
      document.getElementById('aaa').innerHTML = result;
    }
    catch (error) {
      console.log(error);
      document.getElementById('aaa').innerHTML = 'error';
    }
  }



  return (
    <>
      <ThemeProvider theme={theme}>
        <TopBar {...{ isDisplayTrack, setIsDisplayTrack, drawerOpened, setDrawerOpened, theme }} />
        {isDisplayTrack && (
          <>
            <button onClick={calc}>calc</button>
            <h1 id='aaa'>aaa</h1>
            <SearchBar
              {...{
                tracks,
                setTrackIndex,
                setTracks,
                setCurrentTrack,
                histories,
                setHistories
              }}
            />
            <div className="audio-player">
              <div className="inner">
                <PlayList
                  {...{
                    currentTrack,
                    tracks,
                    trackIndex,
                    setTrackIndex,
                    setCurrentTrack,
                    theme
                  }}
                />
                <div>
                  <DisplayTrack
                    {...{
                      currentTrack,
                      tracks,
                      trackIndex,
                      setTrackIndex,
                      setCurrentTrack,
                    }}
                  />
                  {currentTrack && (
                    <Controls
                      {...{
                        playerRef,
                        tracks,
                        trackIndex,
                        setTrackIndex,
                        setCurrentTrack,
                        handleNext,
                      }}
                    />)}
                </div>
              </div>
            </div>
          </>
        )}
        {!isDisplayTrack && (
          <>
            <History
              {...{
                currentTrack,
                tracks,
                setTracks,
                trackIndex,
                setTrackIndex,
                setCurrentTrack,
                histories,
                setHistories
              }}
            />
          </>
        )}
        <Settings  {...{ drawerOpened, setDrawerOpened, theme, setTheme }} />
      </ThemeProvider>
    </>
  );
};
export default App;
