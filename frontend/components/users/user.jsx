import React from 'react';
import PostIndex from '../posts/post_index';
import UserInfo from './user_info';

class User extends React.Component{
  render() {
    return (
      <div>
        {this.props.user ? <UserInfo {...this.props} /> : null}
        <PostIndex {...this.props} />
      </div>
    );
  }
}

export default User;