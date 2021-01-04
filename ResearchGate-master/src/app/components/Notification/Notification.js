import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import Navbar from '../Navbar/Navbar';
import styles from './NotificationStyles';

function Notification(props) {
  const { classes } = props;
  return (
    <div className={classes.mainBody}>
      <Navbar />
      this is the notification page
    </div>
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notification);
