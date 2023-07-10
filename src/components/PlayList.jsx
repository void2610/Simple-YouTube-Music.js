import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const PlayList = ({
  tracks,
  setTrackIndex,
  setCurrentTrack
}) => {
  const maxAuthor = 15;

  function setTrackByList(index) {
    setTrackIndex(index);
    setCurrentTrack(tracks[index]);
  }

  return (
     <List style={{ maxHeight: '420px', overflowY: 'scroll' }}>
      {tracks.map((track, index) => (
        <ListItem button key={index} onClick={() => setTrackByList(index)} className="listItem">
          <ListItemAvatar>
            <Avatar src={track.thumbnail} alt={track.title} />
          </ListItemAvatar>
          <ListItemText
            primary={track.title}
            secondary={track.author.substring(0, maxAuthor)}
            primaryTypographyProps={{ className: "primary" }}
            secondaryTypographyProps={{ style: { color: 'lightgreen' } }}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default PlayList;
