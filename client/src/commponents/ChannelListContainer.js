import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import DmmeIcon from '../assets/images/dmmeicon.png';
import LogoutIcon from '../assets/images/logouticon.png';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';

const SideBar = () => {
  return (
    <>
      <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon'>
          <div className='channel-list__sidebar__icon-inner'>
            <img src={DmmeIcon} alt='dmmeicon' />
          </div>
        </div>
        <div className='channel-list__sidebar__icon'>
          <div className='channel-list__sidebar__icon-inner'>
            <img src={LogoutIcon} alt='logout' />
          </div>
        </div>
      </div>
    </>
  );
};

const Header = () => {
  return (
    <>
      <div className='channel-list__header'>
        <p className='channel-list__header-text'>header</p>
      </div>
    </>
  );
};

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className='channel-list__list-wrapper'>
        <Header />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type='team' />}
          Preview={(previewProps) => <TeamChannelPreview {...previewProps} type='team' />}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type='messaging' />}
          Preview={(previewProps) => <TeamChannelPreview {...previewProps} type='messaging' />}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;