import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';

import { AuthConsumer } from '../../statehandler/authContext';
import styles from './NavbarStyles';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleLogout = () => {
    this.setState({ redirect: true });
    this.props.logout();
  };

  render() {
    const { classes, user } = this.props;

    if (this.state.redirect) return <Redirect to="/welcome" />;

    const profile_picture =
      'https://ui-avatars.com/api/?name=' +
      user.name +
      '&background=007ed9&color=fff&size=35';

    return (
      <div className={classes.mainBody}>
        <div className={classes.left} onClick={this.handleLogout}>
          logout
        </div>
        <div className={classes.right}>
          <Link to="/" className={classes.search}>
            Home
          </Link>
          <Link to="/upload" className={classes.search}>
            Upload
          </Link>
          <Link to="/people" className={classes.search}>
            People
          </Link>
          <Link to="/search" className={classes.search}>
            <SearchIcon />
          </Link>
          <Link to={'/profile/' + user.email}>
            <img className={classes.dp} src={profile_picture} alt="" />
          </Link>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>
    {({ user, logout }) => <Navbar {...props} user={user} logout={logout} />}
  </AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
