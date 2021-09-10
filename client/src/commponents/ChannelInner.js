import React, { useState } from 'react';
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from 'stream-chat-react';
import InfoIcon from '../assets/images/infoicon.png';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div className='channelinner'>
        <Window>
          <TeamChannelTop setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelTop = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    if (channel.type === 'messaging') {
      return (
        <div className='teamchanneltop__name'>
          {members.map(({ user }, i) => (
            <div key={i} className='teamchanneltop__name-container'>
              <Avatar image={user.image} name={user.fullName || user.id} size={32} />
              <p className='teamchanneltop__text user'>{user.fullName || user.id}</p>
            </div>
          ))}

          {additionalMembers > 0 && (
            <p className='teamchanneltop__text user'>and {additionalMembers} more</p>
          )}
        </div>
      );
    }

    return (
      <div className='teamchanneltop__header'>
        <p className='teamchanneltop__header-text'># {channel.data.name}</p>
        <span className='teamchanneltop__header-container' onClick={() => setIsEditing(true)}>
          <img src={InfoIcon} alt='info' />
        </span>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return 'No users online';
    if (watchers === 1) return '1 user online';
    return `${watchers} users online`;
  };

  return (
    <div className='teamchanneltop'>
      <MessagingHeader />
      <div className='teamchanneltop__right'>
        <p className='teamchanneltop__right-text'>{getWatcherText(watcher_count)}</p>
      </div>
    </div>
  );
};

export default ChannelInner;
