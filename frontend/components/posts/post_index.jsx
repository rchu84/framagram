import React from 'react';

import PostIndexItem from './post_index_item';
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from 'react-bootstrap/Spinner';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LIMIT = 5;

class PostIndex extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      max_created_at: null,
      username: this.props.filters,
      hasMorePosts: true
    }
  }
  
  fetchMoreData = () => {
    let data = Object.assign({}, this.state);
    Object.keys(data).forEach(key => (data[key] == null) && delete data[key]);
    delete data["hasMorePosts"];
    this.props.fetchPosts(data)
      .then(res => {
        if (res.results.posts) {
          this.setState({
            max_created_at: this.props.posts[this.props.posts.length - 1].created_at,
            hasMorePosts: Object.keys(res.results.posts).length == LIMIT
          });
        } else {
          this.setState({
            hasMorePosts: false
          });
        }
      });
  }

  componentDidMount() {
    this.fetchMoreData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filters !== prevProps.filters) {
      if (this.props.filters) {
        this.setState({ username: this.props.filters }, () => this.fetchMoreData());
      } else {
        this.fetchMoreData();
      }
    }
  }

  render() {
    // TODO
    // need to fix PostLikes logic

    return (
      <div className="posts-wrapper">
        <InfiniteScroll
          dataLength={this.props.posts.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMorePosts}
          loader={
            <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
            </div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all the posts!</b>
            </p>
          }
        >
        

        {this.props.posts.map(post => 
        <Row className="justify-content-md-center" key={post.id}>
          <Col xs={12} md={8}>
          <PostIndexItem post={post}
            fetchPost={this.props.fetchPost}
            removePost={this.props.removePost}
            postLikes={post.postLikes.map(postLike => this.props.postLikes[postLike.id])}
            comments={
              Object.values(this.props.comments)
                .filter(comment => comment.post_id === post.id)
                .sort((a, b) => (a.created_at < b.created_at) ? -1 : 1)
              }
            currentUserId={this.props.currentUserId}
            author={this.props.users[post.author_id]} 
            key={post.id}
            createPostLike={this.props.createPostLike}
            removePostLike={this.props.removePostLike}
            fetchPostLikes={this.props.fetchPostLikes}
            createComment={this.props.createComment}
            removeComment={this.props.removeComment}
          />
          </Col>
        </Row>)
        }

        </InfiniteScroll>

      </div>
    );
  }
}

export default PostIndex;