import { useState, useEffect } from 'react';

const SearchBar = ({ tracks, setTrackIndex, setTracks, setCurrentTrack}) => {
  const API_KEY = 'AIzaSyDqpgMER8oSy4wDRNIcwepIpDs_2r7PY-U';

  const [url, setUrl] = useState('');
  const [isFirst, setIsFirst] = useState(true);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (url.includes('list=')) {
        const newTracks = await getTracksFromPlaylistUrl(url);
        setTracks(tracks => [...tracks, ...newTracks]);
      } else {
        const track = await getTrackFromUrl(url);
        setTracks(tracks => [...tracks, track]);
      }
      document.getElementById('search-bar-input').value = '';

    }
  }

  useEffect(() => {
    if (tracks.length > 0 && isFirst) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
      setIsFirst(false);
    }
  }, [tracks]);

  async function getTrackFromUrl(url) {
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
      thumbnail: videoData.thumbnails.default.url
    };
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



  return (
    <div className="search-bar">
      <input
        id="search-bar-input"
        type="text"
        placeholder="Input YouTube playlist URL"
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchBar;
