import React from 'react';
import { Link } from 'react-router-dom';

class PostIndexItem extends React.Component {
  render() {
    const { id, caption, author_id, photoUrls, created_at } = this.props.post;
    return (
      //<Link to={`/postes/${id}`}>
        <li className="post-index-item">
          <ul>
            {photoUrls.map((photoUrl, idx) => <img key={idx} src={photoUrl} width="600" />)}
            <li>{caption}</li>
          </ul>
        </li>
      //</Link>
    );
  }
}

export default PostIndexItem;