import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pluralize from 'pluralize';

const UserInfo = (props) => {
  // const {
  //   likeCount,
  //   likers,
  //   fetchPostLikes,
  //   fetchPosts,
  //   followUser,
  //   unfollowUser,
  //   followingIds,
  //   currentUserId
  // } = props;
  const {
    posts,
    user,
    users,
    followUser,
    unfollowUser,
    currentUserId,
    fetchFollowing,
    fetchFollowers
  } = props;

  const [modal, setModal] = useState({
    isOpen: false,
    //users: [],
    title: null
  });

  const toggle = (obj) => setModal({ isOpen: !modal.isOpen, title: obj.title });

  const follow = (userId) => followUser(userId);
  const unfollow = (userId) => unfollowUser(userId);

  useEffect(() => {
    if (modal.isOpen) {
      modal.title === "Following" ? 
        fetchFollowing(user.id) : 
        fetchFollowers(user.id);
    }
  }, [modal]);
  
  const mapFollowersString = str => {
    if (str === "Following") {
      return "followingIds";
    } else {
      return "followerIds";
    }
  };

  return (
    <div>
      <Jumbotron className="user-info-wrapper">
        <h1 className="text-center">{user.username}</h1>
        {currentUserId === user.id ? <Button className="follow-btn" size="sm" variant="outline-info">Edit Profile</Button> :
          currentUserId && user.followerIds.includes(currentUserId) ?
          <Button className="follow-btn" size="sm" variant="outline-info" onClick={() => unfollow(user.id)}>Following</Button> :
          <Button className="follow-btn" size="sm" onClick={() => follow(user.id)}>Follow</Button>}
        <ListGroup horizontal>
          <ListGroup.Item>{Pluralize('post', posts.length, true)}</ListGroup.Item>
          <ListGroup.Item onClick={() => toggle({ title: "Followers" })}>
            {Pluralize('follower', user.followerIds.length, true)}
          </ListGroup.Item>
          <ListGroup.Item onClick={() => toggle({ title: "Following" })}>
            {user.followingIds.length} following
          </ListGroup.Item>
        </ListGroup>
      </Jumbotron>
      <Modal isOpen={modal.isOpen} toggle={() => toggle({ title: null })} className="post-likes-modal" centered>
        <ModalHeader toggle={() => toggle({ title: null })}>{modal.title}</ModalHeader>
        <ModalBody>
          <Table borderless>
            <tbody>
              {user[mapFollowersString(modal.title)].map((id, idx) =>
                users[id] ? 
                <tr key={idx}>
                  <td>{users[id].username}</td>
                  {users[id].id !== currentUserId ?
                    <td>{users[id].followerIds.includes(currentUserId) ?
                      <Button className="follow-btn" size="sm" variant="light" onClick={() => unfollow(users[id].id)}>Following</Button> :
                      <Button className="follow-btn" size="sm" onClick={() => follow(users[id].id)}>Follow</Button>}
                    </td>
                    : null}
                </tr> : null
              )}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UserInfo;