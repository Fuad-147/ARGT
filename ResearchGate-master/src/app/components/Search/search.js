import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { fetchPaper } from '../../axios/paperAxios';

import Navbar from '../Navbar/Navbar';
import styles from './searchStyles';
import Loading from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      searchKeyword: '',
      page: 0,
      firstTime: true,
    };
  }

  componentDidMount() {}

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSearch = () => {
    const { searchKeyword } = this.state;
    this.setState({ page: 0, loading: true, firstTime: false });

    fetchPaper(searchKeyword, 0, (err, tempdata) => {
      if (!err) {
        console.log(tempdata);
        this.setState({ data: tempdata }, () => {
          this.setState({ loading: false });
        });
      } else {
        alert("something went wrong, can't load data");
        this.setState({ loading: false });
      }
    });
  };

  makeAuthor = (arr) => {
    if (arr === undefined) return;

    let ret = '';
    for (let i = 0; i < arr.length; i++) {
      if (i > 0) ret += ', ';
      ret += arr[i].given + ' ' + arr[i].family;
    }

    return ret;
  };

  handlePage = (event, value) => {
    let { searchKeyword } = this.state;
    this.setState({ loading: true });

    if (searchKeyword === '') return;

    fetchPaper(searchKeyword, value - 1, (err, tempdata) => {
      if (!err) {
        console.log(tempdata);
        this.setState({ data: tempdata }, () => {
          this.setState({ loading: false, page: value - 1 });
        });
      } else {
        alert("something went wrong, can't load data");
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, data, searchKeyword, page, firstTime } = this.state;

    console.log(data);
    if (loading) return <Loading />;

    return (
      <div className={classes.mainBody}>
        <div className={classes.bg}>
          <SearchIcon className={classes.searchIcon} />
        </div>
        <div className={classes.contentContainer}>
          <Navbar />
          <div className={classes.searchFieldContainer}>
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
          </div>
          <div className={classes.searchRes}>
            {data
              ? data.map((obj, idx) => (
                  <div key={idx} className={classes.resBox}>
                    <div
                      style={{
                        fontSize: '20px',
                        color: 'black',
                      }}>
                      {obj.title ? obj.title[0] : ''}
                    </div>
                    <div
                      style={{
                        fontSize: '17px',
                        color: 'grey',
                        marginTop: '5px',
                      }}>
                      Authors: {this.makeAuthor(obj.author)}
                    </div>
                    <div
                      style={{
                        fontSize: '17px',
                        color: 'black',
                        marginTop: '5px',
                      }}>
                      Publisher: {obj.publisher}
                    </div>
                    <div
                      style={{
                        fontSize: '15px',
                        color: 'black',
                        marginTop: '5px',
                      }}>
                      Cited by: {`${obj['references-count']}`}
                    </div>
                    <a
                      href={`https://doi.org/${obj.DOI}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginTop: '10px',
                        color: 'blue',
                      }}>{`https://doi.org/${obj.DOI}`}</a>
                  </div>
                ))
              : null}
            <div className={classes.pageHolder}>
              {firstTime ? null : (
                <Pagination
                  count={10}
                  page={page + 1}
                  onChange={this.handlePage}
                  color="primary"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
