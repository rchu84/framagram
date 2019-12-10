import PostIndex from "./post_index";
import { connect } from "react-redux";

import { selectAllPosts } from '../../reducers/selectors';
import { fetchPosts } from '../../actions/post_actions';

const mapStateToProps = state => ({
  posts: selectAllPosts(state),
  users: state.entities.users
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);