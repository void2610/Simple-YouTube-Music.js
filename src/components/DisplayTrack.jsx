import ReactPlayer from 'react-player';


const DisplayTrack = ({
  currentTrack
}) => {
  return (
    <div>
      <ReactPlayer url={currentTrack.src} controls={true} />
    </div>
  );
};

export default DisplayTrack;
