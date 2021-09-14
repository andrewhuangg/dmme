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

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChannelUpdate = async (e) => {
    e.preventDefault();

    const isChannelNameChanged = channelName !== (channel.data.name || channel.data.id);

    if (isChannelNameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  };

  return (
    <div className='editchannel'>
      <div className='editchannel__header'>
        <p>Edit Channel</p>
        <div className='editchannel__close-container'>
          <img
            src={CloseIcon}
            alt='close icon'
            className='editchannel__close'
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
      <ChannelName channelName={channelName} setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className='editchannel__btn' onClick={(e) => handleChannelUpdate(e)}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;
