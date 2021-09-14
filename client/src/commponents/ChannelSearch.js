import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import SearchIcon from '../assets/images/searchicon.png';
import SearchResultsDropDown from './SearchResultsDropDown';

const ChannelSearch = ({ setToggleWidth }) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: 'team',
        name: { $autocomplete: text },
        members: { $in: [client.userId] },
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      // * instead of awaiting both channelResponse and userResponse, we can await both instead and deconstruct;
      const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery('');
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  };

  return (
    <div className='channel-search'>
      <div className='channel-search__input-wrapper'>
        <div className='channel-search__icon'>
          <img src={SearchIcon} alt='search' />
        </div>
        <input
          className='channel-search__input-text'
          placeholder='Search...'
          type='text'
          value={query}
          onChange={(e) => onSearch(e)}
        />
      </div>
      {query && (
        <SearchResultsDropDown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleWidth={setToggleWidth}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
