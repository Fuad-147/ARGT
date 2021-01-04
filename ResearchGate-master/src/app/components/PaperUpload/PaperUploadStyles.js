const styles = theme => ({
  mainBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
  },

  fieldContainer: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
  },

  pr: {
    color: 'grey',
  },

  head: {
    color: 'grey',
    fontSize: '25px',
    fontWeight: 'bold',

    marginTop: '20px',
    marginBottom: '30px',
  },

  inp: {
    width: '85%',
    height: '30px',
    marginTop: '20px',
  },

  btn: {
    color: 'white',
    background: '#38c1d9',
    width: '100px',

    padding: '10px',
    textAlign: 'center',
    borderRadius: '5px',

    marginTop: '50px',
    marginBottom: '50px',
    cursor: 'pointer',
  },

  tagContainer: {
    width: '90%',
    background: '#ebebeb',

    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
});

export default styles;
