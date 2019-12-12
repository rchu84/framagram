import React from 'react';
import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';
import * as timeago from 'timeago.js';
import Button from 'react-bootstrap/Button';
import ButtonToolBar from 'react-bootstrap/ButtonToolbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pluralize from 'pluralize';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.post.postLikes.length,
      liked: this.props.currentUserLiked ? true : false
    };
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  handleLikeClick(e) {
    e.preventDefault();
    if (this.props.currentUserId) {
      if (this.state.liked) {
        this.props.removePostLike(this.props.currentUserLiked.id).then(
          () => {
            this.setState({
              likeCount: this.state.likeCount - 1,
              liked: false
            });
          }
        )
      } else {
        this.props.createPostLike({
          user_id: this.props.currentUserId,
          post_id: this.props.post.id
        }).then(
          () => {
            this.setState({
              likeCount: this.state.likeCount + 1,
              liked: true
            });
          }
        );
      }

      
    }
    
  }

  render() {
    const { id, caption, author_id, photoUrls, created_at } = this.props.post;
    const { username } = this.props.author;

    return (
      <div className="post">
        <div className="post-head">
          <Link to={`/${username}`} className="name">{username}</Link>
          <div className="more-options">
            <Button variant="light"><FontAwesomeIcon icon="ellipsis-h" /></Button>
          </div>
        </div>
        <Carousel interval="" wrap="false">
          {photoUrls.map((photoUrl, idx) =>
            <Carousel.Item key={idx}>
              <img className="d-block w-100" src={photoUrl} width="600" />
            </Carousel.Item>
          )}
        </Carousel>
        <ButtonToolBar>
          <Button variant="light" size="lg" onClick={this.handleLikeClick}>
            {
              this.state.liked ? <FontAwesomeIcon icon={['fas', 'heart']} /> :
                <FontAwesomeIcon icon={['far', 'heart']} />
            }
          </Button>
        </ButtonToolBar>
        {(this.state.likeCount > 0) ? <p className="post-likes">{Pluralize('like', this.state.likeCount, true)}</p> : ""}
        <p className="caption"><Link to={`/${username}`} className="name">{username}</Link>  {caption}</p>
        <p className="timestamp">{timeago.format(created_at)}</p>
      </div>
      //<Link to={`/posts/${id}`}>
      // <div id="postCarousel" className="carousel slide" data-ride="carousel">
      //   <ol className="carousel-indicators">
      //     {photoUrls.map((photoUrl, idx) => <li data-target="#postCarousel" data-slide-to={idx} className={(idx == 0) ? "active" : ""}></li>)}
      //   </ol>

      //   <div className="carousel-inner">
      //     {photoUrls.map((photoUrl, idx) => 
      //       <div className={idx == 0 ? "item active" : "item"}>
      //         <img key={idx} src={photoUrl} width="600" />
      //       </div>
      //     )}
      //   </div>

      //   <a className="left carousel-control" href="#postCarousel" data-slide="prev">
      //     <span className="glyphicon glyphicon-chevron-left"></span>
      //     <span className="sr-only">Previous</span>
      //   </a>
      //   <a className="right carousel-control" href="#postCarousel" data-slide="next">
      //     <span className="glyphicon glyphicon-chevron-right"></span>
      //     <span className="sr-only">Next</span>
      //   </a>

      //   {/* <li className="post-index-item">
      //     <ul>
      //       {photoUrls.map((photoUrl, idx) => <img key={idx} src={photoUrl} width="600" />)}
      //       <li>{caption}</li>
      //     </ul>
      //   </li> */}
      // </div>
      //</Link>
    );
  }
}

export default PostIndexItem;