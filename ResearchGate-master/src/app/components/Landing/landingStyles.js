const styles = (theme) => ({
  mainBody: {
    height: '100vh',
    width: '100%',

    position: 'relative',
  },

  authContainer: {
    //height: '100vh',
    paddingTop: '30px',
    paddingBottom: '30px',

    width: '100%',

    position: 'absolute',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  authTitle: {
    fontSize: '20px',
    fontWeight: '500',

    color: 'grey',
    cursor: 'pointer',
  },

  landContainer: {
    height: '100vh',
    width: '100%',

    position: 'absolute',
    background: 'yellow',

    zIndex: '2',

    transition: 'ease-in-out 1s',
  },

  dp: {
    height: '100%',
    width: '100%',

    objectFit: 'cover',
    filter: 'blur(3px)',
  },

  head: {
    color: 'white',
    position: 'absolute',

    top: '50px',
    left: '50px',

    fontSize: '30px',
    marginBottom: '10px',
  },

  desc: {
    color: 'white',
    position: 'absolute',

    top: '120px',
    left: '50px',

    fontSize: '20px',
    fontWeight: '500',
  },

  getStarted: {
    position: 'absolute',

    bottom: '100px',
    left: 'calc((100% - 150px)/2)',

    width: '150px',
    height: '50px',

    fontSize: '17px',
    fontWeight: '500',
    color: 'white',

    backgroundColor: 'grey',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    cursor: 'pointer',
  },
});

export default styles;
