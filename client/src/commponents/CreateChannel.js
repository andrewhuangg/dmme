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
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const [channelName, setChannelName] = useState('');

  const handleCreateChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      // * MONITOR new messages in channel
      await newChannel.watch();

      // * CLEAN UP
      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]); // * We always want to be in the channels we create
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

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
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className='createchannel__btn' onClick={(e) => handleCreateChannel(e)}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </div>
    </div>
  );
};

export default CreateChannel;
