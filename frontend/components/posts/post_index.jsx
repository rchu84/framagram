import React from 'react';

import PostIndexItem from './post_index_item';

class PostIndex extends React.Component{
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <ul className="post-index">
        {this.props.posts.map(post => <PostIndexItem post={post} key={post.id} />)}
      </ul>
    );
  }
}

export default PostIndex;