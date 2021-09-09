import React from 'react';
import AddIcon from '../assets/images/addicon.png';

const TeamChannelList = ({ children, error = false, loading, type }) => {
  if (error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message error-message'>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading-message'>
          {type === 'team' ? 'Channels' : 'Messages'} Loading...
        </p>
      </div>
    );
  }

  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header-title'>
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        {/* button add channel */}
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
