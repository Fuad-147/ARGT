import React from 'react';
import Loader from '@material-ui/core/CircularProgress';

function Loading(props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Loader />
    </div>
  );
}

export default Loading;
