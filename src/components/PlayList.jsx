import { List, ListItem, ListItemText } from '@material-ui/core';

const PlayList = ({
  tracks,
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
     <List style={{ maxHeight: '420px', overflowY: 'scroll' }}>
      {tracks.map((track, index) => (
        <ListItem button key={index} onClick={() => setTrackByList(index)}>
          <ListItemText
            primary={track.title.substring(0, maxTitleLength)}
            secondary={track.author.substring(0, maxAuthor)}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default PlayList;
