import React from 'react';
import PropTypes from 'prop-types';
import SecureLS from 'secure-ls';

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    const key = 'covid19';
    var ls = new SecureLS({
      encodingType: 'aes',
      isCompression: true,
      encryptionSecret: `${key}`,
    });

    let auth = ls.get('authR');
    let us = ls.get('userDetailR');

    this.state = {
      isAuthenticated: auth === 'true' ? true : false,
      user: auth === 'true' ? us : {},
    };
  }

  componentDidMount() {}

  setLoggedIn = (user) => {
    this.setState({ isAuthenticated: true });
    this.setState({ user });

    const key = 'covid19';
    var ls = new SecureLS({
      encodingType: 'aes',
      isCompression: true,
      encryptionSecret: `${key}`,
    });

    ls.set('authR', 'true');
    ls.set('userDetailR', user);
  };

  getUser = () => {
    return this.state.user;
  };

  updateUser = (name, subject, institution, skills) => {
    let { user } = this.state;

    user.name = name;
    user.subject = subject;
    user.institution = institution;
    user.skills = skills;

    this.setState({ user });

    const key = 'covid19';
    var ls = new SecureLS({
      encodingType: 'aes',
      isCompression: true,
      encryptionSecret: `${key}`,
    });

    ls.set('userDetailR', user);
  };

  checkAuth = () => {
    return this.state.isAuthenticated;
  };

  logout = () => {
    let { isAuthenticated, user } = this.state;
    user = {};
    isAuthenticated = false;

    this.setState({ isAuthenticated, user });
    const key = 'covid19';
    var ls = new SecureLS({
      encodingType: 'aes',
      isCompression: true,
      encryptionSecret: `${key}`,
    });

    ls.removeAll();
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          logout: this.logout,
          updateUser: this.updateUser,
          setLoggedIn: this.setLoggedIn,
          checkAuth: this.checkAuth,
          getUser: this.getUser,
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
