const PlayList = ({
  currentTrack,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack
}) => {
  const maxTitleLength = 20;
  const maxAuthor = 15;

  function setTrackByList(index) {
    setTrackIndex(index);
    setCurrentTrack(tracks[index]);
  }

  return (
    <div style={{ height: '420px', overflowY: 'scroll' }}>
      <ul>
      {tracks.map((track, index) => (
        <li key={index} onClick={() => setTrackByList(index)}>
          {track.title.substring(0, maxTitleLength)}
          {track.title.length > maxTitleLength && '...'}
          <p key={index}>
            {track.author.substring(0, maxAuthor)}
            {track.author.length > maxAuthor && '...'}
          </p>
          <img src={track.thumbnail} alt={track.title}/>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default PlayList;
