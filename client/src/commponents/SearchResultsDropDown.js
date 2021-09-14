import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const userChannel = async ({ client, setActiveChannel, channel, setChannel }) => {
  const filters = {
    type: 'messaging',
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [isChannelExisting] = await client.queryChannels(filters);

  if (isChannelExisting) return setActiveChannel(isChannelExisting);

  const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });

  setChannel(newChannel);

  return setActiveChannel(newChannel);
};

const SearchItem = ({ channel, focusedId, type, setChannel, setToggleWidth }) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === 'channel') {
    return (
      <div
        onClick={() => {
          setChannel(channel);
          if (setToggleWidth) {
            setToggleWidth((prevState) => !prevState);
          }
        }}
        className={
          focusedId === channel.id ? 'searchdropdown__item-focused' : 'searchdropdown__item'
        }
      >
        <div className='searchdropdown__item-hashtag'>#</div>
        <p className='searchdropdown__item-text'>{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        userChannel({ client, setActiveChannel, channel, setChannel });
        if (setToggleWidth) {
          setToggleWidth((prevState) => !prevState);
        }
      }}
      className={focusedId === channel.id ? 'searchdropdown__item-focused' : 'searchdropdown__item'}
    >
      <div className='searchdropdown__item-container'>
        <Avatar image={channel.image || undefined} name={channel.name} size={24} />
        <p className='searchdropdown__item-text'>{channel.name}</p>
      </div>
    </div>
  );
};

const SearchResultsDropDown = ({
  teamChannels,
  directChannels,
  focusedId,
  loading,
  setChannel,
  setToggleWidth,
}) => {
  console.log(teamChannels);
  return (
    <div className='searchdropdown'>
      <p className='searchdropdown__header'>Channels</p>
      {loading && !teamChannels.length && (
        <p className='searchdropdown__header'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className='searchdropdown__header'>
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchItem
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='channel'
            setToggleWidth={setToggleWidth}
          />
        ))
      )}
      <p className='searchdropdown__header'>Users</p>
      {loading && !directChannels.length && (
        <p className='searchdropdown__header'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className='searchdropdown__header'>
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchItem
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='user'
            setToggleWidth={setToggleWidth}
          />
        ))
      )}
    </div>
  );
};

export default SearchResultsDropDown;
