import React from "react";
import NavbarContainer from './navbar/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import PostIndexContainer from './posts/post_index_container';
import CreatePostFormContainer from './posts/create_post_form_container';
import EditPostFormContainer from './posts/edit_post_form_container';
import PostDetailContainer from './posts/post_detail_container';
import PostByUsernameContainer from './posts/post_by_username_container';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <div>
    <header>
      <NavbarContainer />
    </header>

    <Switch>
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      
      <Route exact path="/p/:postId"
        render={props => <div className="posts-wrapper"><PostDetailContainer {...props} /></div>} />
      <Route exact path="/:username" component={PostByUsernameContainer} />
      <ProtectedRoute exact path="/" component={PostIndexContainer} />
      <ProtectedRoute exact path="/posts/new" component={CreatePostFormContainer} />
      <ProtectedRoute exact path="/p/:postId/edit" component={EditPostFormContainer} />
    </Switch>
  </div>
);

export default App;