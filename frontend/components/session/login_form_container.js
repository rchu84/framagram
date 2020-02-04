import { connect } from 'react-redux';
import { login, clearErrorsOnRouteChange } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
  errors: state.ui.errors.session,
  formType: 'login'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: formUser => dispatch(login(formUser)),
  clearErrors: () => dispatch(clearErrorsOnRouteChange())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);