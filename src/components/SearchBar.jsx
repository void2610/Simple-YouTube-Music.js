import { useState } from 'react';

const SearchBar = ({ setTracks }) => {
  const API_KEY = 'AIzaSyDqpgMER8oSy4wDRNIcwepIpDs_2r7PY-U';

  const [url, setUrl] = useState('');

  const handleKeyDown = async (event) => {
  if (event.key === 'Enter') {
    if (url.includes('list=')) {
      const newTracks = await getTracksFromPlaylistUrl(url);
      setTracks(tracks => [...tracks, ...newTracks]);
    } else {
      const track = await getTrackFromUrl(url);
      setTracks(tracks => [...tracks, track]);
    }
    console.log(tracks);
  }
}


  function getVideoId(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }

  async function getVideoData(videoId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`);
    const data = await response.json();
    return data.items[0].snippet;
  }

  async function getTrackFromUrl(url) {
    const videoId = getVideoId(url);
    const videoData = await getVideoData(videoId);

    return {
      title: videoData.title,
      src: url,
      author: videoData.channelTitle,
      thumbnail: videoData.thumbnails.default.url
    };
  }

  async function getPlaylistData(playlistId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`);
    const data = await response.json();
    return data.items;
  }

  async function getTracksFromPlaylistUrl(url) {
    const playlistId = url.split('list=')[1];
    const playlistData = await getPlaylistData(playlistId);

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
        type="text"
        placeholder="Input YouTube playlist URL"
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchBar;
