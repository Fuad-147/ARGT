const styles = (theme) => ({
  mainBody: {
    height: '70px',
    background: 'grey',
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
  },

  left: {
    height: '100%',
    width: '20%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',

    paddingLeft: '10px',

    color: 'white',
    cursor: 'pointer',
  },

  right: {
    height: '100%',
    width: '80%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',

    paddingRight: '10px',
  },

  dp: {
    borderRadius: 100,

    objectPosition: 'center',
    objectFit: 'cover',
  },

  search: {
    marginRight: '15px',
    color: 'white',
    textDecoration: 'none',
  },
});

export default styles;
