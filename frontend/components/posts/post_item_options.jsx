import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pluralize from 'pluralize';

const PostItemOptions = (props) => {
  // const {
  //   removePost
  // } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const deletePost = () => {
    props.removePost(props.postId);
  };

  return (
    <div className="more-options">
      <Button variant="light" onClick={toggle}>
        <FontAwesomeIcon icon="ellipsis-h" />
      </Button>

      <Modal isOpen={modal} toggle={toggle} size="sm" centered>
        <ModalBody>
          <Table borderless size="sm" className="post-options">
            <tbody>
              {props.removePost ? 
              <tr>
                <td><Button variant="light" size="sm" onClick={deletePost} className="delete-post-btn">Delete Post</Button></td>
              </tr> : ""}
              <tr>
                <td><Button variant="light" size="sm" onClick={toggle}>Cancel</Button></td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PostItemOptions;