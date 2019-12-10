import React from 'react';

import PostIndexItem from './post_index_item';

class PostIndex extends React.Component{
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="posts-wrapper">
        {this.props.posts.map(post => <PostIndexItem post={post} author={this.props.users[post.author_id]} key={post.id} />)}
      </div>
    );
  }
}

export default PostIndex;