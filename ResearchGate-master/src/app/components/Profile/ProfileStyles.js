const styles = (theme) => ({
  mainBody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },

  dp: {
    width: '70px',
    height: '70px',
    borderRadius: 100,

    marginTop: '20px',
  },

  name: {
    marginTop: '15px',
    color: 'grey',
    fontSize: '25px',
    fontWeight: 'bolder',
  },

  contentContainer: {
    background: '#ebebeb',
    paddingTop: '20px',
    paddingBottom: '20px',
    marginTop: '50px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',

    [theme.breakpoints.down('md')]: {
      width: '90%',
    },

    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
  },

  slot: {
    width: '100%',
    marginBottom: '10px',
    paddingLeft: '5px',

    display: 'inline-flex',

    fontWeight: '400',
    fontSize: '20px',
  },

  key: {
    color: 'grey',
    marginRight: '15px',
  },

  val: {
    color: 'black',
  },

  lnk: {
    paddingTop: '5px',
    paddingBottom: '5px',

    width: '100px',
    textAlign: 'center',

    textDecoration: 'none',
    color: 'white',

    background: '#007ed9',
    borderRadius: '20px',

    cursor: 'pointer',
    marginTop: '10px',
  },

  works: {
    paddingTop: '20px',
    paddingBottom: '20px',

    width: '90%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },

  following: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    marginTop: '15px',
    marginBottom: '15px',
    width: '90%',
  },

  fol: {
    paddingTop: '5px',
    paddingBottom: '5px',

    paddingLeft: '15px',
    paddingRight: '15px',
    textAlign: 'center',
    color: 'white',

    background: '#007ed9',
    borderRadius: '20px',

    pointer: 'cursor',
    margin: '5px',
    textDecoration: 'none',
  },
});

export default styles;
