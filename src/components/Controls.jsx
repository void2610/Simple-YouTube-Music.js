import { useState, useEffect, useRef, useCallback } from 'react';

// icons
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
} from 'react-icons/io5';

const Controls = ({
  playerRef,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (playerRef && playerRef.current) {
      if (isPlaying) {
        playerRef.current.getInternalPlayer().playVideo();
      } else {
        playerRef.current.getInternalPlayer().pauseVideo();
      }
    }
  }, [isPlaying, playerRef]);


  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
    setIsPlaying(true);
  };

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>

        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
    </div>
  );
};

export default Controls;
