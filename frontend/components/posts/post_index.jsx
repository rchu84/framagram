import React from 'react';

import PostIndexItem from './post_index_item';
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from 'react-bootstrap/Spinner';

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
      .then(res => this.setState({
        max_created_at: this.props.posts[this.props.posts.length - 1].created_at,
        hasMorePosts: Object.keys(res.results.posts).length == LIMIT
      }));
  }

  componentDidMount() {
    this.fetchMoreData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      // let data = Object.assign({}, this.state);
      // Object.keys(data).forEach(key => (data[key] == null) && delete data[key]);
      // delete data["hasMorePosts"];
      // this.props.fetchPosts(data)
      //   .then(() => this.setState({
      //     max_created_at: this.props.posts[this.props.posts.length - 1].created_at
      //   }));
      this.fetchMoreData();
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
          <PostIndexItem post={post}
            fetchPost={this.props.fetchPost}
            removePost={this.props.removePost}
            postLikes={post.postLikes.map(postLike => this.props.postLikes[postLike.id])}
            comments={
              Object.values(this.props.comments)
                .filter(comment => comment.post_id === post.id)
                .sort((a, b) => (a.created_at < b.created_at) ? -1 : 1)
              // post.comments.map(comment => this.props.comments[comment.id])
              //   .sort((a, b) => (a.created_at < b.created_at) ? -1 : 1)
              }
            currentUserId={this.props.currentUserId}
            author={this.props.users[post.author_id]} 
            key={post.id}
            createPostLike={this.props.createPostLike}
            removePostLike={this.props.removePostLike}
            fetchPostLikes={this.props.fetchPostLikes}
            createComment={this.props.createComment}
            removeComment={this.props.removeComment}
          />)
        }

        </InfiniteScroll>

      </div>
    );
  }
}

export default PostIndex;