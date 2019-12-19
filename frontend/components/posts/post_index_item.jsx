import React from 'react';
import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';
import * as timeago from 'timeago.js';
import Button from 'react-bootstrap/Button';
import ButtonToolBar from 'react-bootstrap/ButtonToolbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pluralize from 'pluralize';
import PostItemOptions from './post_item_options';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PostLikeIndex from '../post_likes/post_like_index';
import PostLikeIndexContainer from '../post_likes/post_like_index_container';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let postLikeByCurrentUser = this.props.postLikes.find(el => el.user_id === this.props.currentUserId);
    this.state = {
      comment: "",
      likeCount: this.props.postLikes.length,
      liked: postLikeByCurrentUser ? true : false,
      postLikeId: postLikeByCurrentUser ? postLikeByCurrentUser.id : null
    };
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  componentDidMount() {
    if (this.props.filters) {
      this.props.fetchPost(this.props.match.params.postId)
        .then(res => {
          let postLikes = res.results.post_likes;
          let postLikeByCurrentUser = postLikes ? Object.values(postLikes).find(el => el.user_id === this.props.currentUserId) : null;
          this.setState({
            likeCount: postLikes ? Object.keys(postLikes).length : 0,
            liked: postLikeByCurrentUser ? true : false,
            postLikeId: postLikeByCurrentUser ? postLikeByCurrentUser.id : null
          });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters) {
      if (prevProps.match.params.postId !== this.props.match.params.postId) {
        this.props.fetchPost(this.props.match.params.postId)
          .then(res => {
            let postLikes = res.results.post_likes;
            let postLikeByCurrentUser = postLikes ? Object.values(postLikes).find(el => el.user_id === this.props.currentUserId) : null;
            this.setState({
              comment: "",
              likeCount: postLikes ? Object.keys(postLikes).length : 0,
              liked: postLikeByCurrentUser ? true : false,
              postLikeId: postLikeByCurrentUser ? postLikeByCurrentUser.id : null
            });
          });
      }
    }
  }

  mouseEnter(e) {
    let commentDeleteBtn = e.target.querySelector('button');
    if (commentDeleteBtn) {
      commentDeleteBtn.hidden = false;
    }
  }
  
  mouseLeave(e) {
    let commentDeleteBtn = e.target.querySelector('button');
    if (commentDeleteBtn) {
      commentDeleteBtn.hidden = true;
    }
  }

  handleLikeClick(e) {
    e.preventDefault();
    if (this.props.currentUserId) {
      if (this.state.liked) {
        this.props.removePostLike(this.state.postLikeId).then(
          () => {
            this.setState({
              likeCount: this.state.likeCount - 1,
              liked: false,
              postLikeId: null
            });
          }
        )
      } else {
        this.props.createPostLike({
          user_id: this.props.currentUserId,
          post_id: this.props.post.id
        }).then(
          action => {
            this.setState({
              likeCount: this.state.likeCount + 1,
              liked: true,
              postLikeId: Object.keys(action.results.post_likes)[0]
            });
          }
        );
      }
    }
  }

  handleCommentInput(e) {
    this.setState({ comment: e.currentTarget.value });
  }

  handleCommentSubmit(e) {
    e.preventDefault();
    this.props.createComment({
      comment: this.state.comment,
      user_id: this.props.currentUserId,
      post_id: this.props.post.id
    })
    //.then(() => {this.props.fetchPost(this.props.post.id)})
    .then(
      () => {
        this.setState({ comment: "" });
      }
    );
  }

  handleCommentDelete(commentId) {
    return e => {
      e.preventDefault();
      this.props.removeComment(commentId);
    }
  }

  render() {
    if (!this.props.post) return null;

    const { id, caption, author_id, photoUrls, created_at } = this.props.post;
    const { username } = this.props.author;
    const comments = this.props.comments;
    const currentUserId = this.props.currentUserId;

    return (
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <div className="post">
            <div className="post-head">
              <Link to={`/${username}`} className="username">{username}</Link>

              <PostItemOptions removePost={author_id === currentUserId ? this.props.removePost : null}
                goToPost={this.props.filters}
                postId={id}
              />
            </div>

            <Carousel interval={null} 
              controls={photoUrls.length > 1 ? true : false} 
              indicators={photoUrls.length > 1 ? true : false}>
              {photoUrls.map((photoUrl, idx) =>
                <Carousel.Item key={idx}>
                  <img className="d-block w-100" src={photoUrl} width="600" />
                </Carousel.Item>
              )}
            </Carousel>

            <ButtonToolBar>
              <div>
              <Button variant="light" size="lg" onClick={this.handleLikeClick}>
                {
                  this.state.liked ? <FontAwesomeIcon icon={['fas', 'heart']} /> :
                    <FontAwesomeIcon icon={['far', 'heart']} />
                }
              </Button>
              </div>
              <Button variant="light" size="lg">
                <FontAwesomeIcon icon={['far', 'comment']} />
              </Button>
            </ButtonToolBar>

            {
              (this.state.likeCount > 0) ? 
                <PostLikeIndexContainer postId={id} likeCount={this.state.likeCount} />
                : ""
            }

            <ListGroup variant="flush">
            {
              (caption) ? <ListGroup.Item className="caption">
                <Link to={`/${username}`} className="username">
                  {username}
                </Link>  {caption}
              </ListGroup.Item> : ""
            }

            {
              (comments.length > 0) ? 
              comments.map((comment, idx) => 
                <ListGroup.Item className="caption" key={idx}
                  onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
                >
                  <Link to={`/${comment.username}`} className="username">
                    {comment.username}
                  </Link>  {comment.comment}
                  {comment.user_id === currentUserId ? 
                    <Button variant="light" size="sm" hidden={true}
                      className="comment-delete-btn"
                      onClick={this.handleCommentDelete(comment.id)}>
                      <FontAwesomeIcon icon="times" />
                    </Button> : ""
                  }
                </ListGroup.Item>
                ) : "" 
            }
            </ListGroup>

            <p className="timestamp">{timeago.format(created_at).toUpperCase()}</p>

            <InputGroup className="comment-bar" size="lg">
              <FormControl
                as="textarea"
                className="comment-input"
                placeholder="Add a comment..."
                aria-label="Add a comment..."
                value={this.state.comment}
                onChange={this.handleCommentInput}
              />
              <InputGroup.Append>
                <Button
                  variant="light"
                  className="comment-btn"
                  disabled={this.state.comment ? false : true}
                  onClick={this.handleCommentSubmit}
                >
                    Post
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Col>
      </Row>

    );
  }
}

export default PostIndexItem;