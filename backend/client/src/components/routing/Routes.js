import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import PostForm from '../posts/PostForm';
import AddSkill from '../profiles-forms/AddSkill';
import AddOther from '../profiles-forms/AddOther';
import AddExp from '../profiles-forms/AddExp';
import AddEdu from '../profiles-forms/AddEdu';
import AddCertification from '../profiles-forms/AddCertification';
import CreateProfile from '../profiles-forms/CreateProfile';
import EditProfile from '../profiles-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Dashboard from '../dashboard/Dashboard';
import Friend from '../friends/Friend';

import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/posts' component={Posts} />
      <Route exact path='/profiles' component={Profiles} />

      <PrivateRoute exact path='/post-form' component={PostForm} />
      <PrivateRoute exact path='/posts/:id' component={Post} />

      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/add-experience' component={AddExp} />
      <PrivateRoute exact path='/add-education' component={AddEdu} />
      <PrivateRoute exact path='/add-other' component={AddOther} />
      <PrivateRoute exact path='/add-skill' component={AddSkill} />
      <PrivateRoute exact path='/create-profile' component={CreateProfile} />
      <PrivateRoute exact path='/edit-profile' component={EditProfile} />
      <PrivateRoute exact path='/friend/:id' component={Friend} />

      <PrivateRoute exact path='/profiles/:id' component={Profile} />
      <PrivateRoute
        exact
        path='/add-certification'
        component={AddCertification}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
