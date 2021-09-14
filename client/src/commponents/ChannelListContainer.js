import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import DmmeIcon from '../assets/images/dmmeicon.png';
import LogoutIcon from '../assets/images/logouticon.png';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';

const cookies = new Cookies();

const SideBar = ({ logout }) => {
  return (
    <>
      <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon'>
          <div className='channel-list__sidebar__icon-inner'>
            <img src={DmmeIcon} alt='dmmeicon' />
          </div>
        </div>
        <div className='channel-list__sidebar__icon'>
          <div className='channel-list__sidebar__icon-inner' onClick={logout}>
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
        <p className='channel-list__header-text'>dMMe</p>
      </div>
    </>
  );
};

const TeamChannelFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
};

const DirectMessageChannelFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleWidth,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  };

  // * grab all channels and dms where our user is included
  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list-wrapper'>
        <Header />
        <ChannelSearch setToggleWidth={setToggleWidth} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={TeamChannelFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type='team'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleWidth={setToggleWidth}
              setToggleWidth={setToggleWidth}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type='team'
              setToggleWidth={setToggleWidth}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />

        <ChannelList
          filters={filters}
          channelRenderFilterFn={DirectMessageChannelFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type='messaging'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleWidth={setToggleWidth}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type='messaging'
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleWidth={setToggleWidth}
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({ setIsCreating, setCreateType, setIsEditing }) => {
  const [toggleWidth, setToggleWidth] = useState(false);

  return (
    <>
      <div className='channel-list__container'>
        {/* Desktop */}
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <div className={`channel-list__mobile mobile-${toggleWidth}`}>
          <div
            className='channel-list__toggle'
            onClick={() => setToggleWidth((prevToggle) => !prevToggle)}
          ></div>

          {/* Mobile */}
          <ChannelListContent
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            setToggleWidth={setToggleWidth}
          />
        </div>
      </div>
    </>
  );
};

export default ChannelListContainer;
