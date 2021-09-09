import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import SearchIcon from '../assets/images/searchicon.png';

const ChannelSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const getChannels = async (text) => {
    try {
      // TODO fetch channels
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
    </div>
  );
};

export default ChannelSearch;
