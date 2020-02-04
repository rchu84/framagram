import { connect } from 'react-redux';
import { signup, clearErrorsOnRouteChange } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
  errors: state.ui.errors.session,
  formType: 'signup'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: formUser => dispatch(signup(formUser)),
  clearErrors: () => dispatch(clearErrorsOnRouteChange())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);