import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style.css';

import Alert from './layout/Alert';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Posts from './posts/Posts';
import Post from './post/Post';
import PostForm from './posts/PostForm';
import AddSkill from './profiles-forms/AddSkill';
import AddOther from './profiles-forms/AddOther';
import AddExp from './profiles-forms/AddExp';
import AddEdu from './profiles-forms/AddEdu';
import AddCertification from './profiles-forms/AddCertification';
import CreateProfile from './profiles-forms/CreateProfile';
import EditProfile from './profiles-forms/EditProfile';
import Profiles from './profiles/Profiles';
import Profile from './profile/Profile';
import Dashboard from './dashboard/Dashboard';
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Footer from './layout/Footer';

import { loadUser } from '../actions';
import store from '../store';
import { Provider } from 'react-redux';
import setAuthToken from '../utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='container'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Alert />
            <Switch>
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />

              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/posts' component={Posts} />
              <Route exact path='/post-form' component={PostForm} />
              <Route exact path='/posts/:id' component={Post} />
              <Route exact path='/add-experience' component={AddExp} />
              <Route exact path='/add-education' component={AddEdu} />
              <Route exact path='/add-other' component={AddOther} />
              <Route exact path='/add-skill' component={AddSkill} />
              <Route exact path='/create-profile' component={CreateProfile} />
              <Route exact path='/edit-profile' component={EditProfile} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profiles/:id' component={Profile} />
              <Route
                exact
                path='/add-certification'
                component={AddCertification}
              />
            </Switch>
            <Footer />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
