import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import ChannelListContainer from './commponents/ChannelListContainer';
import ChannelContainer from './commponents/ChannelContainer';
import Auth from './commponents/Auth';

import './assets/style.scss';

const apiKey = '5uns9nzdeq5d';

// create instance of chat
const client = StreamChat.getInstance(apiKey);

// authentication
const authToken = false;

const App = () => {
  if (!authToken) return <Auth />;

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
