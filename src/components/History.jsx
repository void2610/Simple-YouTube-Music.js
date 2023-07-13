import React from "react";
import SimpleBarReact from 'simplebar-react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import 'simplebar-react/dist/simplebar.min.css';

const History = ({ currentTrack, tracks, setTracks, trackIndex, setTrackIndex, setCurrentTrack, histories, setHistories }) => {
  const API_KEY = 'AIzaSyDqpgMER8oSy4wDRNIcwepIpDs_2r7PY-U';
  async function setTrackByHistories(index) {
    const history = histories[index];
    if (history.type === 'video') {
      setTracks(tracks => [...tracks, history]);

      for (let i = 0; i < histories.length; i++) {
        if (histories[i].src === history.src) {
          histories.splice(i, 1);
          break;
        }
      }
      setHistories(histories => [...histories, history]);
    }
    else if (history.type === 'playlist') {
      const playlist = await getTracksFromPlaylistUrl(history.src);
      setTracks(tracks => [...tracks, ...playlist]);

      for (let i = 0; i < histories.length; i++) {
        if (histories[i].src === history.src) {
          histories.splice(i, 1);
          break;
        }
      }
      setHistories(histories => [...histories, playlist]);
    }
  }

  async function getTracksFromPlaylistUrl(url) {
    const playlistId = url.split('list=')[1];
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`);
    const data = await response.json();
    const playlistData = data.items;
    return playlistData.map(item => ({
      title: item.snippet.title,
      src: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      author: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.default.url
    }));
  }

  const clearTracks = () => {
    setTracks([]);
    setCurrentTrack(null);
  }

  const clearHistories = () => {
    setHistories([]);
    localStorage.removeItem('histories');
  }


  return (
    <>
      <SimpleBarReact style={{ maxHeight: '460px' }}>
        <List>
          {histories.slice().reverse().map((track, index) => (
            <ListItem button key={index} className="listItem" onClick={() => setTrackByHistories(histories.length - 1 - index)}>
              <ListItemAvatar>
                <Avatar src={track.thumbnail} alt={track.title} />
              </ListItemAvatar>
              <ListItemText
                primary={track.title}
                secondary={track.author}
                primaryTypographyProps={{ className: "primary" }}
                secondaryTypographyProps={{ style: { color: '#396cd8' } }}
              />
            </ListItem>
          ))}
        </List>
      </SimpleBarReact>

      {histories.length != 0 && (<button onClick={clearHistories}>Clear Histories</button>)}
      {tracks.length != 0 && (<button onClick={clearTracks}>Clear Tracks</button>)}
    </>
  );
};

export default History;
