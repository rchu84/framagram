import React from 'react';

import PostIndexItem from './post_index_item';

class PostIndex extends React.Component{
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="posts-wrapper">
        {this.props.posts.map(post => 
          <PostIndexItem post={post}
            postLikes={post.postLikes.map(postLike => this.props.postLikes[postLike.id])}
            // currentUserLiked={post.postLikes.find(el => el.user_id === this.props.currentUserId)}
            currentUserId={this.props.currentUserId}
            author={this.props.users[post.author_id]} 
            key={post.id}
            createPostLike={this.props.createPostLike}
            removePostLike={this.props.removePostLike}
            fetchPostLikes={this.props.fetchPostLikes} />)
        }
      </div>
    );
  }
}

export default PostIndex;