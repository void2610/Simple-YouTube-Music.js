import React from "react";
import SimpleBarReact from 'simplebar-react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import 'simplebar-react/dist/simplebar.min.css';

const History = ({ currentTrack, tracks, trackIndex, setTrackIndex, setCurrentTrack, histories, setHistories }) => {
  return (<SimpleBarReact style={{ maxHeight: '420px' }}>
    <List>
      {histories.map((track, index) => (
        <ListItem button key={index}
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
  </SimpleBarReact>);

};

export default History;
