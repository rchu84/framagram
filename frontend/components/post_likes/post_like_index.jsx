import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pluralize from 'pluralize';
import { Link } from 'react-router-dom';

const PostLikeIndex = (props) => {
  const {
    likeCount,
    likers,
    fetchPostLikes,
    fetchPosts,
    followUser,
    unfollowUser,
    followingIds,
    currentUserId
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const follow = (userId) => followUser(userId);
  const unfollow = (userId) => unfollowUser(userId);



  useEffect(() => {
    if (modal) {
      fetchPostLikes()
    }
  }, [modal]);

  return (
    <div>
      <Button variant="link" onClick={toggle} className="post-likes">
        {Pluralize('like', likeCount, true)}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="post-likes-modal" centered>
        <ModalHeader toggle={toggle}>Likes</ModalHeader>
        <ModalBody>
          <Table borderless>
            <tbody>
              {likers.map((liker, idx) =>
                <tr key={idx}>
                  <td><Link to={`/${liker.username}`}>{liker.username}</Link></td>
                  {liker.user_id !== currentUserId ?
                  <td>{followingIds.includes(liker.user_id) ? 
                      <Button className="follow-btn" size="sm" variant="outline-info" onClick={() => unfollow(liker.user_id)}>Following</Button> :
                      <Button className="follow-btn" size="sm" onClick={() => follow(liker.user_id)}>Follow</Button>}
                  </td>
                  : null}
                </tr>)}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PostLikeIndex;