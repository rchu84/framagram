import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { searchUsers } from '../../actions/user_actions';
import Navbar from './navbar';

const mapStateToProps = ({ entities, session }) => ({
  currentUser: entities.users[session.id]
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  searchUsers: query => dispatch(searchUsers(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);