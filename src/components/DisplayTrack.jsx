import ReactPlayer from 'react-player';

const DisplayTrack = ({
  currentTrack,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack
}) => {

  const playNext = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  }



  return (
    <div>
      {currentTrack && (
        <ReactPlayer url={currentTrack.src} controls={true} playing={true} onEnded={playNext} />
      )}
    </div>
  );
};

export default DisplayTrack;
