import { useRef, useState } from "react";

// import components
import DisplayTrack from "./components/DisplayTrack";
import Controls from "./components/Controls";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import PlayList from "./components/PlayList";
import History from "./components/History";

const App = () => {
  const [isDisplayTrack, setIsDisplayTrack] = useState(true);

  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  // reference
  const playerRef = useRef();

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
      <TopBar {...{ setIsDisplayTrack }} />
      {isDisplayTrack && (
        <>
          <SearchBar
            {...{
              tracks,
              setTrackIndex,
              setTracks,
              setCurrentTrack,
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
                <Controls
                  {...{
                    playerRef,
                    tracks,
                    trackIndex,
                    setTrackIndex,
                    setCurrentTrack,
                    handleNext,
                  }}
                />
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
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
            }}
          />
        </>
      )}
    </>
  );
};
export default App;
