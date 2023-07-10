import SimpleBarReact from 'simplebar-react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import 'simplebar-react/dist/simplebar.min.css';

const PlayList = ({
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack
}) => {
  function setTrackByList(index) {
    setTrackIndex(index);
    setCurrentTrack(tracks[index]);
  }

  return (
    <SimpleBarReact style={{ maxHeight: '420px' }}>
      <List>
        {tracks.map((track, index) => (
          <ListItem button key={index} onClick={() => setTrackByList(index)}
            className="listItem"
            style={{ backgroundColor: trackIndex === index ? 'rgb(35, 35, 35)' : 'transparent' }}
          >
            <ListItemAvatar>
              <Avatar src={track.thumbnail} alt={track.title} />
            </ListItemAvatar>
            <ListItemText
              primary={track.title}
              secondary={track.author}
              primaryTypographyProps={{ className: "primary" }}
              secondaryTypographyProps={{ style: { color: 'lightgreen' } }}
            />
          </ListItem>
        ))}
      </List>
    </SimpleBarReact>
  );
}

export default PlayList;
