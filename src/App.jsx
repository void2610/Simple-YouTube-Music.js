import { useRef, useState } from 'react';

// import components
import DisplayTrack from './components/DisplayTrack';
import Controls from './components/Controls';
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
      <TopBar />
      <SearchBar setTracks={setTracks} />
      <div className="audio-player">
        <div className="inner">
          <DisplayTrack
            {...{
              currentTrack,
              playerRef,
              handleNext,
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
    </>
  );
};
export default App;
