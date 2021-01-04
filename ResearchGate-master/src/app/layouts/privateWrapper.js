import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '@material-ui/core/CircularProgress';

import { AuthConsumer } from '../statehandler/authContext';

class PrivateComponent extends Component {
  state = {
    status: undefined,
  };

  componentDidMount() {
    this.setState({ status: this.props.checkAuth() });
  }

  render() {
    const { status } = this.state;
    const { component } = this.props;

    if (status === true) return component;
    else if (status === false) return <Redirect to={'/welcome'} />;
    else return <Loading />;
  }
}

const ConsumerComponent = props => (
  <AuthConsumer>
    {({ checkAuth }) => <PrivateComponent {...props} checkAuth={checkAuth} />}
  </AuthConsumer>
);

export default ConsumerComponent;
