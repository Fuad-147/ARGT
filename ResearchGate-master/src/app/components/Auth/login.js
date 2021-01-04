import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { login } from '../../axios/authAxios';
import { fetchProfile } from '../../axios/profileAxios';
import { AuthConsumer } from '../../statehandler/authContext';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import styles from './loginStyles';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',

      showPassword: false,

      errorSignin: {
        email: false,
        password: false,
      },

      errorMsg: {
        email: 'wrong credentials!!',
        password: 'wrong credentials!!',
      },
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleLogin = () => {
    const { email, password } = this.state;

    const data = {
      email: email,
      password: password,
    };

    login(data, (err, userData) => {
      if (err) alert('error while login' + err);
      else {
        console.log('logged in', userData);

        fetchProfile(email, (err, axios_data) => {
          if (err) alert('error while fetching your info' + err);
          else {
            this.props.setLoggedIn(axios_data);
          }
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { email, password, showPassword, errorSignin, errorMsg } = this.state;

    return (
      <div className={classes.mainBody}>
        <p className={classes.loginHead}>Login</p>
        <TextField
          required
          onChange={this.handleChange('email')}
          value={email}
          id="signin-email"
          label="email"
          className={classes.txtField}
          error={errorSignin.email}
          type="email"
          helperText={errorSignin.email === false ? '' : errorMsg.email}
        />

        <TextField
          required
          helperText={errorSignin.password === false ? '' : errorMsg.password}
          id="signin-password"
          className={classes.txtField}
          value={password}
          type={showPassword ? 'text' : 'password'}
          label="password"
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={() =>
                    this.setState({
                      showPassword: !showPassword,
                    })
                  }>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.loginBtn} onClick={this.handleLogin}>
          Log In
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>
    {({ setLoggedIn }) => <Login {...props} setLoggedIn={setLoggedIn} />}
  </AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
