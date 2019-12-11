import React from 'react';
import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';
import * as timeago from 'timeago.js';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.postId !== this.props.match.params.postId) {
      this.props.fetchPost(this.props.match.params.postId);
    }
  }

  render() {
    const { post, author } = this.props;
    if (!post || !author) return null;

    const { caption, photoUrls, created_at } = this.props.post;
    const { username } = this.props.author;
    
    return (
      <div className="posts-wrapper">
      <div className="post">
        <div className="post-head">
          <Link to={`/${username}`} className="name">{username}</Link>
        </div>
        <Carousel interval="" wrap="false">
          {photoUrls.map((photoUrl, idx) =>
            <Carousel.Item key={idx}>
              <img className="d-block w-100" src={photoUrl} width="600" />
            </Carousel.Item>
          )}
        </Carousel>
        <p className="caption"><Link to={`/${username}`} className="name">{username}</Link>  {caption}</p>
        <p className="timestamp">{timeago.format(created_at)}</p>
      </div>
      </div>
    );
  }
}

export default PostDetail;