import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pluralize from 'pluralize';

const PostLikeIndex = (props) => {
  const {
    likeCount,
    likers,
    fetchPostLikes
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Likes</ModalHeader>
        <ModalBody>
          <Table borderless>
            <tbody>
              {likers.map((liker, idx) => <tr key={idx}><td>{liker}</td></tr>)}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PostLikeIndex;