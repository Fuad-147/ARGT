const styles = (theme) => ({
  mainBody: {
    width: '300px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  txtField: {
    width: '100%',
    marginBottom: '10px',
  },

  loginHead: {
    color: 'grey',
    fontSize: '25px',
    fontWeight: '500',
  },

  loginBtn: {
    color: 'white',
    backgroundColor: 'grey',

    fontSize: 'grey',
    fontWeight: '300',

    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',

    borderRadius: '15px',

    marginTop: '20px',
    marginBottom: '30px',

    cursor: 'pointer',
  },

  tagContainer: {
    width: '100%',
    background: '#ebebeb',

    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

    marginBottom: '15px',
  },

  chip: {
    padding: '10px',
    background: 'grey',
    color: 'white',

    margin: '5px',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
    borderRadius: '10px',
  },

  pr: {
    color: 'grey',
    marginTop: '20px',
  },
});

export default styles;
