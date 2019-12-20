import PostExplore from "./post_explore";
import { connect } from "react-redux";

import { fetchPostsExplore } from '../../actions/post_actions';

const mapDispatchToProps = dispatch => ({
  fetchPostsExplore: filters => dispatch(fetchPostsExplore(filters))
});

export default connect(
  null,
  mapDispatchToProps
)(PostExplore);