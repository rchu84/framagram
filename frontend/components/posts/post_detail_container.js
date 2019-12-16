import { connect } from 'react-redux';
import PostIndexItem from './post_index_item';
import { fetchPost } from '../../actions/post_actions';
import { userByPostId, likersByPostId, commentsByPostId } from '../../reducers/selectors';


const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.id,
  post: state.entities.posts[ownProps.match.params.postId],
  author: userByPostId(state.entities, ownProps.match.params.postId),
  postLikes: likersByPostId(state.entities, ownProps.match.params.postId),
  comments: commentsByPostId(state.entities, ownProps.match.params.postId),
  filters: ownProps.match.params.postId
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  createPostLike: formPostLike => dispatch(createPostLike(formPostLike)),
  removePostLike: postLikeId => dispatch(removePostLike(postLikeId)),
  fetchPostLikes: postId => dispatch(fetchPostLikes(postId)),
  createComment: formComment => dispatch(createComment(formComment)),
  removeComment: commentId => dispatch(removeComment(commentId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndexItem);

/*

const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.id,
  posts: selectAllPosts(state),
  users: state.entities.users,
  postLikes: state.entities.postLikes,
  comments: state.entities.comments,
  filters: null
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: filters => dispatch(fetchPosts(filters)),
  fetchPost: postId => dispatch(fetchPost(postId)),
  removePost: postId => dispatch(removePost(postId)),
  createPostLike: formPostLike => dispatch(createPostLike(formPostLike)),
  removePostLike: postLikeId => dispatch(removePostLike(postLikeId)),
  fetchPostLikes: postId => dispatch(fetchPostLikes(postId)),
  createComment: formComment => dispatch(createComment(formComment)),
  removeComment: commentId => dispatch(removeComment(commentId)),
});


  componentDidMount() {
    this.props.fetchPosts(this.props.filters);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.props.fetchPosts(this.props.filters);
    }
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
*/