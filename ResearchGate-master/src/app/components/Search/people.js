import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import Loading from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Navbar from '../Navbar/Navbar';

import { validateEmail } from '../../util/emailValidator';
import { Link } from 'react-router-dom';
import { getPeople } from '../../axios/profileAxios';

const styles = (theme) => ({
  mainBody: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },

  head: {
    fontSize: '25px',
    fontWeight: 'bolder',
    marginTop: '40px',

    width: '100%',
    padding: '10px',
    textAlign: 'center',
    color: 'grey',
  },

  field: {
    width: '50%',
    marginTop: '20px',
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
    marginTop: '20px',
  },

  peopleContainer: {
    width: '100%',

    marginTop: '20px',
    marginBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  box: {
    padding: '15px',
    border: '1px solid grey',
    margin: '20px',
  },
});

class FindPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchKeyword: '',
      people: [],
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSearch = () => {
    const { searchKeyword } = this.state;

    let search = '';
    if (validateEmail(searchKeyword)) search = 'email';
    else search = 'tag';

    this.setState({ loading: true });
    getPeople(searchKeyword, search, (err, axios_data) => {
      if (!err) {
        this.setState({ people: axios_data, loading: false });
      } else {
        this.setState({ loading: false });
        alert('something went wrong');
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { searchKeyword, loading, people } = this.state;

    if (loading) return <Loading />;

    return (
      <div className={classes.mainBody}>
        <Navbar />
        <div className={classes.head}>
          write a topic name and find out who are working with it or find using
          email
        </div>

        <TextField
          className={classes.field}
          id="search"
          label="search"
          onChange={this.handleChange('searchKeyword')}
          value={searchKeyword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <div className={classes.btn} onClick={() => this.handleSearch()}>
          search
        </div>

        <div className={classes.peopleContainer}>
          {people.map((obj, idx) => (
            <div key={idx} className={classes.box}>
              <div
                style={{
                  color: '#007ed9',
                  fontSize: '20px',
                  fontWeight: '500',
                }}>
                {obj.name}
              </div>
              <div
                style={{
                  color: 'grey',
                  fontSize: '15px',
                }}>
                {obj.email}
              </div>
              <Link
                style={{
                  color: '#007ed9',
                  fontSize: '15px',
                  fontWeight: '500',
                  textDecoration: 'none',
                }}
                target="_blank"
                to={'/profile/' + obj.email}>
                view profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

FindPeople.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FindPeople);
