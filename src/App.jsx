import { useRef, useState } from 'react';
//import { tracks } from './data/tracks';

// import components
import DisplayTrack from './components/DisplayTrack';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
import TopBar from './components/TopBar';
import SearchBar from './components/SearchBar';

const App = () => {
  const [tracks, setTracks] = useState([{
    title: "黒鉄たま (CV: 秋奈) - いただきバベル (Aiobahn Remix) [Official Music Video]",
    src: "https://www.youtube.com/watch?v=viChXQFBbfg",
    author: "Aiobahn",
    thumbnail: "https://i.ytimg.com/vi/viChXQFBbfg/default.jpg",
    }]);

  // states
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(
    tracks[trackIndex]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);



  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

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
      <TopBar />
      <SearchBar setTracks={setTracks}/>
      <div className="audio-player">
        <div className="inner">
          <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </>
  );
};
export default App;
