import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pluralize from 'pluralize';
import { withRouter } from 'react-router-dom';

const PostItemOptions = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const deletePost = () => {
    props.removePost(props.postId);
  };

  const updatePost = () => {
    props.history.push(`/p/${props.postId}/edit`)
  };

  const goToPost = () => {
    props.history.push(`/p/${props.postId}`)
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
              {props.updatePost ? 
              <tr>
                <td><Button variant="light" size="sm" onClick={updatePost} className="delete-post-btn">Edit Post</Button></td>
              </tr> : null}
              {!props.goToPost ?
                <tr>
                  <td><Button variant="light" size="sm" onClick={goToPost}>Go to post</Button></td>
                </tr> : null}
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

export default withRouter(PostItemOptions);