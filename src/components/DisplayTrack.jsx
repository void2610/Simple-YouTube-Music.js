import ReactPlayer from 'react-player';
import React, { useState, useEffect } from 'react';

const DisplayTrack = ({
  currentTrack,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack
}) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('clearing timeout');
      setPlaying(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [])

  const playNext = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
    setIsPlaying(true);
  }

  return (
    <div>
      <ReactPlayer url={currentTrack.src} controls={true} playing={playing} onEnded={playNext}/>
    </div>
  );
};

export default DisplayTrack;
