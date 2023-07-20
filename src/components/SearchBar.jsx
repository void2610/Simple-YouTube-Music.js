import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { invoke } from "@tauri-apps/api/tauri";
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ tracks, setTrackIndex, setTracks, setCurrentTrack, histories, setHistories }) => {

  const API_KEY = 'AIzaSyDqpgMER8oSy4wDRNIcwepIpDs_2r7PY-U';

  const [url, setUrl] = useState('');
  const [isFirst, setIsFirst] = useState(true);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      start_search();
    }
  }

  useEffect(() => {
    if (tracks.length > 0 && isFirst) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
      setIsFirst(false);
    }
  }, [tracks]);

  async function startSearch() {
    if (url.includes('list=')) {

      const playlist = await createHistoryFromPlaylistUrl(url);
      for (let i = 0; i < histories.length; i++) {
        if (histories[i].src === playlist.src) {
          histories.splice(i, 1);
          break;
        }
      }
      setHistories(histories => [...histories, playlist]);
    } else {

      const history = await createHistoryFromUrl(url);
      for (let i = 0; i < histories.length; i++) {
        if (histories[i].src === history.src) {
          histories.splice(i, 1);
          break;
        }
      }
      setHistories(histories => [...histories, history]);
    }
    document.getElementById('search-bar-input').value = '';
  }

  async function start_search() {
    try {
      const result = await invoke('start_search', { url: url });
      setTracks(tracks => [...tracks, ...result]);
      document.getElementById('search-bar-input').value = '';
    }
    catch (error) {
      throw new Error(error);
    }

  }

  async function createHistoryFromUrl(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    const videoId = (match && match[7].length == 11) ? match[7] : false;

    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`);
    const data = await response.json();
    const videoData = data.items[0].snippet;

    return {
      title: videoData.title,
      src: url,
      author: videoData.channelTitle,
      thumbnail: videoData.thumbnails.default.url,
      type: 'video'
    };
  }

  async function createHistoryFromPlaylistUrl(url) {
    const playlistId = url.split('list=')[1];
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`);
    const data = await response.json();
    const playlistData = data.items[0];

    return {
      title: playlistData.snippet.title,
      src: url,
      author: playlistData.snippet.channelTitle,
      thumbnail: playlistData.snippet.thumbnails.default.url,
      type: 'playlist'
    };
  }

  return (
    <>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: '#2f2f2f', boxShadow: 'none' }} style={{ widows: '100%' }}
      >
        <TextField fullWidth id='search-bar-input' label="Search" variant="standard"
          color='primary'
          placeholder="Input YouTube playlist URL"
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            style: {
              color: '#c2c2c2',
              boxShadow: 'none'
            }
          }}
          InputLabelProps={{
            style: {
              color: '#c2c2c2'
            }
          }}
        />
        <Tooltip title="Search">
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
            onClick={() => { start_search() }}
            style={{ color: '2f2f2f', boxShadow: 'none', marginLeft: '12px' }}>
            <SearchIcon style={{ color: '#c2c2c2' }} />
          </IconButton>
        </Tooltip>
      </Paper >
    </>
  )
}

export default SearchBar;
