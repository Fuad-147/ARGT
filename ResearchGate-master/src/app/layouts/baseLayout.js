import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateComponent from './privateWrapper';
import LandingLayout from './landingLayout';
import SearchLayout from './searchLayout';
import HomeLayout from './homeLayout';
import PaperUpload from '../components/PaperUpload/PaperUpload';
import NotificationLayout from '../components/Notification/Notification';
import Profile from '../components/Profile/Profile';
import EditProfile from '../components/Profile/EditProfile';
import ViewPaper from '../components/PaperView/viewPaper';
import FindPeople from '../components/Search/people';

import { AuthProvider } from '../statehandler/authContext';

const BaseLayout = () => (
  <Router>
    <AuthProvider>
      <div>
        <Switch>
          <Route exact path="/welcome" component={LandingLayout} />
          {/* <Route exact path="/search" component={SearchLayout} /> */}
          <Route
            exact
            path="/"
            render={(props) => (
              <PrivateComponent component={<HomeLayout {...props} />} />
            )}
          />

          <Route
            exact
            path="/home"
            render={(props) => (
              <PrivateComponent component={<HomeLayout {...props} />} />
            )}
          />

          <Route
            exact
            path="/search"
            render={(props) => (
              <PrivateComponent component={<SearchLayout {...props} />} />
            )}
          />

          <Route
            exact
            path="/people"
            render={(props) => (
              <PrivateComponent component={<FindPeople {...props} />} />
            )}
          />

          <Route
            exact
            path="/upload"
            render={(props) => (
              <PrivateComponent component={<PaperUpload {...props} />} />
            )}
          />

          <Route
            exact
            path="/profile/:email"
            render={(props) => (
              <PrivateComponent component={<Profile {...props} />} />
            )}
          />

          <Route
            exact
            path="/editprofile"
            render={(props) => (
              <PrivateComponent component={<EditProfile {...props} />} />
            )}
          />

          <Route
            exact
            path="/viewpaper"
            render={(props) => (
              <PrivateComponent component={<ViewPaper {...props} />} />
            )}
          />
        </Switch>
      </div>
    </AuthProvider>
  </Router>
);

export default BaseLayout;
