import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { AuthConsumer } from '../../statehandler/authContext';
import Login from '../Auth/login';
import Signup from '../Auth/signup';
import { Redirect } from 'react-router-dom';

import landingImage from '../../assets/research.jpg';

import styles from './landingStyles';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLanding: true,
      login: true,
    };
  }

  handleClick = () => {
    this.setState({ showLanding: false });
  };

  render() {
    const { classes, isAuthenticated } = this.props;
    const { showLanding, login } = this.state;

    if (isAuthenticated === true) {
      return <Redirect to="/home" />;
    }

    return (
      <div className={classes.mainBody}>
        <div className={classes.authContainer}>
          {login === true ? <Login /> : <Signup />}
          <div
            onClick={() => this.setState({ login: !login })}
            className={classes.authTitle}>
            {login ? 'create an account' : 'already have an account?'}
          </div>
        </div>

        <div
          className={classes.landContainer}
          style={{ marginTop: showLanding ? '0' : '-120vh' }}
          onClick={() => this.handleClick()}>
          <img className={classes.dp} src={landingImage} alt="" />

          <h1 className={classes.head}>
            All Research Publication Get Together
          </h1>
          <p className={classes.desc}>
            Read, Upload and Search papers from journals all over the world
          </p>

          <div className={classes.getStarted}>get started</div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Landing {...props} isAuthenticated={isAuthenticated} />
    )}
  </AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
