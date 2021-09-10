import React from 'react';
import { Channel, useChatContext } from 'stream-chat-react';
import ChannelInner from './ChannelInner';
import CreateChannel from './CreateChannel';
import TeamMessage from './TeamMessage';
import EditChannel from './EditChannel';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div className='channelcontainer'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className='channelcontainer'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyChatHistory = () => {
    return (
      <div className='channelcontainer__empty'>
        <p className='channelcontainer__empty-first'>This is the beginning of your chat history.</p>
        <p className='channelcontainer__empty-second'>
          Send direct messages, attachments, emojis, and more!
        </p>
      </div>
    );
  };

  return (
    <div className='channelcontainer'>
      <Channel
        EmptyStateIndicator={EmptyChatHistory}
        Message={(messageProps, i) => <TeamMessage key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
