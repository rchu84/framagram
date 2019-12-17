import React from "react";
import NavbarContainer from './navbar/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import PostIndexContainer from './posts/post_index_container';
import CreatePostFormContainer from './posts/create_post_form_container';
import EditPostFormContainer from './posts/edit_post_form_container';
import PostDetailContainer from './posts/post_detail_container';
import PostByUsernameContainer from './posts/post_by_username_container';
import UserContainer from './users/user_container';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <div>
    <header>
      <NavbarContainer />
    </header>

    <Container fluid={true}>
    <Switch>
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      
      <Route exact path="/p/:postId"
        render={props => <div className="posts-wrapper"><PostDetailContainer {...props} /></div>} />
      <Route exact path="/:username" component={UserContainer} />
      <ProtectedRoute exact path="/" component={PostIndexContainer} />
      <ProtectedRoute exact path="/posts/new" component={CreatePostFormContainer} />
      <ProtectedRoute exact path="/p/:postId/edit" component={EditPostFormContainer} />
    </Switch>
    </Container>
  </div>
);

export default App;