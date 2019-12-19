import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pluralize from 'pluralize';
import { Link } from 'react-router-dom';

const UserInfo = (props) => {
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
        <div className="user-info-header">
          <h1>{user.username}</h1>
          {/* {currentUserId === user.id ? <Button className="follow-btn" size="sm" variant="outline-info">Edit Profile</Button> : */}
          { currentUserId === user.id ? null :
            currentUserId && user.followerIds.includes(currentUserId) ?
            <Button className="follow" size="sm" variant="outline-info" onClick={() => unfollow(user.id)}>Following</Button> :
            <Button className="follow" size="sm" onClick={() => follow(user.id)}>Follow</Button>}
        </div>

        <ListGroup horizontal className="user-stats">
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
        <ModalBody className="modal-body"> <Table borderless>
            <tbody>
              {user[mapFollowersString(modal.title)].map((id, idx) =>
                users[id] ? 
                <tr key={idx}>
                    <td><Link to={`/${users[id].username}`} onClick={() => toggle({ title: null })}>{users[id].username}</Link></td>
                  {users[id].id !== currentUserId ?
                    <td>{users[id].followerIds.includes(currentUserId) ?
                      <Button className="follow-btn" size="sm" variant="outline-info" onClick={() => unfollow(users[id].id)}>Following</Button> :
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