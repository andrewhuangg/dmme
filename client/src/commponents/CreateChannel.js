import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';
import CloseIcon from '../assets/images/closeicon.png';

const ChannelName = ({ channelName = '', setChannelName }) => {
  const handleChannelName = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };

  return (
    <div className='channelname'>
      <p>Name</p>
      <input
        value={channelName}
        onChange={(e) => handleChannelName(e)}
        placeholder='channel-name (no spaces)'
      />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const [channelName, setChannelName] = useState('');

  return (
    <div className='createchannel'>
      <div className='createchannel__header'>
        <p>{createType === 'team' ? 'Create New Channel' : 'Send Direct Message'}</p>
        <div className='createchannel__close-container'>
          <img
            src={CloseIcon}
            alt='close icon'
            className='createchannel__close'
            setIsCreating={setIsCreating}
          />
        </div>
      </div>
      {createType === 'team' && (
        <ChannelName channelName={channelName} setChannelName={setChannelName} />
      )}
      <UserList />
    </div>
  );
};

export default CreateChannel;
