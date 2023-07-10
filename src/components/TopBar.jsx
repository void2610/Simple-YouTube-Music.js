import React from 'react';

const TopBar = ({ setIsDisplayTrack }) => {
  const trackButtonClick = () => {
    setIsDisplayTrack(true);
  }
  const historyButtonClick = () => {
    setIsDisplayTrack(false);
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button style={{ width: '49.5%' }} onClick={trackButtonClick}>Tracks</button>
      <button style={{ width: '49.5%' }} onClick={historyButtonClick}>History</button>
    </div>
  );
};

export default TopBar;
