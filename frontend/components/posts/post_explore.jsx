import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from 'react-bootstrap/Spinner';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { withRouter } from 'react-router-dom';

const LIMIT = 18;

class PostExplore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasMorePosts: false
    }
  }

  fetchMoreData = () => {
    let data = { post_ids: this.state.posts.map(post => post.id) }
    this.props.fetchPostsExplore(data)
      .then(res => {
        let posts = res.results.posts;
        this.setState({
          posts: [...this.state.posts, ...Object.values(posts)],
          hasMorePosts: posts ? Object.keys(posts).length == LIMIT : false
        });
      });
  }

  componentDidMount() {
    this.fetchMoreData();
  }

  render() {
    // className="justify-content-md-center"
    let posts = [...this.state.posts];
    let display = [];
    while (posts.length > 0) {
      let row = posts.splice(0, 3);
      display.push(
        <Row key={row[0].id} className="row-explore">
          {row.map((post, idx) =>
            <Col xs={4} key={idx}>
              <Image
                src={post.photoUrls.sort()[0]}
                onClick={() => this.props.history.push(`/p/${post.id}`)}
                thumbnail />
          </Col>)}
        </Row>
      );
    }

    return (
      <div className="posts-explore-wrapper">
        <InfiniteScroll
          dataLength={this.state.posts.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMorePosts}
          loader={
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>}
        >

        {display}

        </InfiniteScroll>

      </div>
    );
  }
}

export default withRouter(PostExplore);

// {
//   this.state.posts.map((post, idx) =>
//     <Col>
//       <Image
//         src={post.photoUrls[0]}
//         onClick={() => this.props.history.push(`/p/${post.id}`)}
//         rounded />
//     </Col>
//   )
// }

//    <Row className="justify-content-md-center">
