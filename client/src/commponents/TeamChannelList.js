import React from 'react';
import AddIcon from '../assets/images/addicon.png';

const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
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
        <div className='team-channel-list__add-container'>
          <img
            src={AddIcon}
            alt='add icon'
            className='team-channel-list__add'
            onClick={() => {
              setCreateType(type === 'team' ? 'team' : 'messaging');
              setIsCreating((prev) => !prev);
              setIsEditing(false);
              // if (setToggle) setToggle((prev) => !prev);
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
