import React from 'react';

import PostIndexItem from './post_index_item';

class PostIndex extends React.Component{
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    // TODO
    // need to fix PostLikes logic

    return (
      <div className="posts-wrapper">
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
      </div>
    );
  }
}

export default PostIndex;