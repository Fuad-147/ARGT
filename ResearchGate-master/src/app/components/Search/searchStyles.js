const styles = (theme) => ({
  mainBody: {
    height: '100vh',
    width: '100%',

    position: 'relative',

    top: '0',
    left: '0',
  },

  bg: {
    height: '100vh',
    width: '100%',

    position: 'fixed',
    top: '0',
    left: '0',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  searchIcon: {
    color: 'grey',
    opacity: '0.5',
    height: '250px',
    width: '250px',
  },

  contentContainer: {
    width: '100%',

    position: 'absolute',

    background: 'white',
    opacity: '0.8',

    top: '0',
    left: '0',

    zIndex: '1',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },

  searchFieldContainer: {
    width: '100%',
    marginTop: '25px',
    marginBottom: '25px',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignContent: 'center',
  },

  field: {
    width: '50%',
  },

  btn: {
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '15px',
    paddingRight: '15px',

    borderRadius: '15px',
    background: 'grey',
    color: 'white',

    marginLeft: '5px',
    cursor: 'pointer',
  },

  type: {
    display: 'inline-flex',
    marginBottom: '25px',
    marginTop: '15px',
  },

  box: {
    display: 'inline-flex',
    padding: '10px',
    cursor: 'pointer',
    boxShadow: '0 0 3px black',

    margin: '15px',
    borderRadius: '10px',
  },

  searchRes: {
    width: '90%',
    marginTop: '25px',
    marginBottom: '25px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  resBox: {
    width: '100%',

    padding: '10px',
    marginBottom: '20px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',

    borderRadius: '10px',
    border: '1px solid grey',
  },

  pageHolder: {
    width: '100%',
    marginTop: '25px',
    marginBottom: '25px',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default styles;
