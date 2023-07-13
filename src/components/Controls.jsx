import { AppBar, Toolbar, makeStyles, Button, IconButton, ButtonGroup } from '@material-ui/core'
import { useState, useEffect, useRef, useCallback } from 'react';

// icons
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';

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

        <IconButton aria-label="previous song" onClick={handlePrevious} style={{ color: 'white', boxShadow: 'none' }}>
          <FastRewindRounded fontSize="large" />
        </IconButton>
        <IconButton aria-label="next song" onClick={handleNext} style={{ color: 'white', boxShadow: 'none' }}>
          <FastForwardRounded fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default Controls;
