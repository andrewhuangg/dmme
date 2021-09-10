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

const UserListItem = ({ user }) => {
  const [isInvited, setIsInvited] = useState(false);
  const handleInvite = (e) => {
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

const UserList = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListEmpty, setIsListEmpty] = useState(false);

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
        console.log(error);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  return (
    <UserListContainer>
      {loading ? (
        <div className='userlistcontainer__loading'>Loading Users...</div>
      ) : (
        users?.map((user, i) => <UserListItem index={i} key={user.id} user={user} />)
      )}
    </UserListContainer>
  );
};

export default UserList;
