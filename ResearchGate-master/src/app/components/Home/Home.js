import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AuthConsumer } from '../../statehandler/authContext';
import { Link } from 'react-router-dom';

import { getNewsFeed } from '../../axios/paperAxios';
import { getSuggestion } from '../../axios/profileAxios';

import Loading from '../Loading/loading';
import PaperBox from '../PaperView/paperBox';
import Navbar from '../Navbar/Navbar';

import styles from './HomeStyles';
import Pagination from '@material-ui/lab/Pagination';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 1,
      papers: [],
      followSuggestion: [],
      email: '',
    };
  }

  componentDidMount() {
    this.setState({ email: this.props.user.email });
    this.fetchData();
  }

  componentDidUpdate() {
    if (this.props.user.email !== this.state.email) {
      this.setState({ email: this.props.user.email });
      this.fetchData();
    }
  }

  fetchData = () => {
    const { page } = this.state;
    getNewsFeed(this.props.user.email, 10, page, (err, axios_data) => {
      if (!err) {
        this.setState({ papers: axios_data, loading: false });
      } else {
        alert('problem fetching your feed!!');
        this.setState({ loading: false });
      }
    });

    const limit = 20;
    if (this.props.user.email !== undefined) {
      console.log(this.props.user.email);
      getSuggestion(this.props.user.email, limit, (err, axios_data) => {
        if (!err) {
          this.setState({ followSuggestion: axios_data });
        }
      });
    }
  };

  handlePage = (event, value) => {
    this.setState({ loading: true });
    getNewsFeed(this.props.user.email, 10, value, (err, axios_data) => {
      if (!err) {
        if (axios_data.length)
          this.setState({ papers: axios_data, loading: false, page: value });
        else this.setState({ loading: false });
      } else {
        alert('problem fetching your feed!!');
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, papers, page, followSuggestion } = this.state;

    if (loading) return <Loading />;

    console.log(papers.length, 'len');

    return (
      <div className={classes.mainBody}>
        <Navbar />
        <div
          style={{
            color: 'grey',
            fontSize: '20px',
            fontWeight: '500',
            marginBottom: '30px',
            marginTop: '30px',
          }}>
          follow people working in the same field !!!
        </div>
        <div className={classes.peopleContainer}>
          {followSuggestion
            ? followSuggestion.map((obj, idx) => (
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
              ))
            : null}
        </div>
        <div className={classes.feed}>
          <div
            style={{
              color: 'grey',
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '30px',
              textAlign: 'center',
            }}>
            follow more people and their works will appear in your feed. to find
            more people click
            <Link
              to="/people"
              style={{
                color: '#007ed9',
                fontSize: '20px',
                fontWeight: 'bolder',
                marginLeft: '5px',
              }}>
              here
            </Link>
          </div>
          {papers.docs
            ? papers.docs.map((obj, idx) => (
                <PaperBox
                  paper={obj}
                  key={idx}
                  showDelete={false}
                  handleDelete={() => {}}
                />
              ))
            : 'follow people to get their works in your feed !!!'}
        </div>
        {page === 1 && papers.docs.length === 0 ? null : (
          <Pagination
            count={10}
            page={page}
            onChange={this.handlePage}
            color="primary"
            style={{ marginBottom: '50px' }}
          />
        )}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>{({ user }) => <Home {...props} user={user} />}</AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
