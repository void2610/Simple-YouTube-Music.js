import SimpleBarReact from 'simplebar-react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import 'simplebar-react/dist/simplebar.min.css';
import { useRef, useEffect } from 'react';

const PlayList = ({
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack
}) => {
  const simpleBarRef = useRef();

  useEffect(() => {
    if (simpleBarRef.current) {
      const scrollElement = simpleBarRef.current.getScrollElement();
      const listItem = scrollElement.querySelector(`[data-index="${trackIndex}"]`);
      if (listItem) {
        scrollElement.scrollTop = listItem.offsetTop;
      }
    }
  }, [trackIndex]);

  function setTrackByList(index) {
    setTrackIndex(index);
    setCurrentTrack(tracks[index]);
  }

  return (
    <div style={{ width: '240px' }}>
      <SimpleBarReact style={{ maxHeight: '420px' }} ref={simpleBarRef}>
        <List>
          {tracks.map((track, index) => (
            <ListItem button key={index} onClick={() => setTrackByList(index)}
              className="listItem"
              style={{ backgroundColor: trackIndex === index ? 'rgb(35, 35, 35)' : 'transparent' }}
              data-index={index}
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
    </div>
  );
}

export default PlayList;
