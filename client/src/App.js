import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import ChannelListContainer from './commponents/ChannelListContainer';
import ChannelContainer from './commponents/ChannelContainer';
import Auth from './commponents/Auth';

import './assets/style.scss';

const cookies = new Cookies();
const authToken = cookies.get('token');

const apiKey = process.env.REACT_APP_API_KEY;

// create instance of chat
const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
    },
    authToken
  );
}

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
