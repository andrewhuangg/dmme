import React, { useState, useEffect } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import InviteIcon from '../assets/images/inviteicon.png';

const UserListContainer = ({ children }) => {
  return (
    <div className='userlistcontainer'>
      <div className='userlistcontainer__header'>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserListItem = ({ user, setSelectedUsers }) => {
  const [isInvited, setIsInvited] = useState(false);

  const handleInvite = (e) => {
    if (isInvited) {
      // filter out invited users
      setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id));
    } else {
      // invite users
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setIsInvited((prev) => !prev);
  };

  return (
    <div className='userlistitem' onClick={(e) => handleInvite(e)}>
      <div className='userlistitem__name'>
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className='userlistitem__user-name'>{user.fullName || user.id}</p>
      </div>
      {isInvited ? (
        <img src={InviteIcon} alt='invite icon' className='userlistitem__invite' />
      ) : (
        <div className='userlistitem__empty-invite' />
      )}
    </div>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const res = await client.queryUsers(
          { id: { $ne: client.userID } }, // * Dont include own id
          { id: 1 }, // * SORT
          { limit: 8 } // * OPTIONS
        );

        if (res.users.length) {
          setUsers(res.users);
        } else {
          setIsListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <UserListContainer>
        <div className='userlistcontainer__error'>Error, please refresh and try again.</div>
      </UserListContainer>
    );
  }

  if (isListEmpty) {
    return (
      <UserListContainer>
        <div className='userlistcontainer__empty-list'>No Users Found.</div>
      </UserListContainer>
    );
  }

  return (
    <UserListContainer>
      {loading ? (
        <div className='userlistcontainer__loading'>Loading Users...</div>
      ) : (
        users?.map((user, i) => (
          <UserListItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
        ))
      )}
    </UserListContainer>
  );
};

export default UserList;
