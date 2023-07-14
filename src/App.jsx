import { useRef, useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import DisplayTrack from "./components/DisplayTrack";
import Controls from "./components/Controls";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import PlayList from "./components/PlayList";
import History from "./components/History";
import Settings from "./components/Settings";

const App = () => {

  const [theme, setTheme] = useState(createTheme({
    palette: {
      primary: {
        main: '#535bf2',
      },
    },
  }));

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isDisplayTrack, setIsDisplayTrack] = useState(true);

  // ローカルストレージから履歴データを取得
  const savedHistories = localStorage.getItem('histories');
  const [histories, setHistories] = useState(savedHistories ? JSON.parse(savedHistories) : []);

  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  // reference
  const playerRef = useRef();

  // 履歴データが更新されたときにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('histories', JSON.stringify(histories));
  }, [histories]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <TopBar {...{ isDisplayTrack, setIsDisplayTrack, drawerOpened, setDrawerOpened }} />
        {isDisplayTrack && (
          <>
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
                    setCurrentTrack
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
        <Settings  {...{ drawerOpened, setDrawerOpened }} />
      </ThemeProvider>
    </>
  );
};
export default App;
