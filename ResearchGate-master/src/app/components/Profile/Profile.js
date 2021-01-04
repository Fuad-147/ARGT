import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import PaperBox from '../PaperView/paperBox';

import styles from './ProfileStyles';
import { AuthConsumer } from '../../statehandler/authContext';
import {
  fetchProfile,
  fetchFollowing,
  follow,
  unfollow,
} from '../../axios/profileAxios';

import { getPaperFromdb, deletePaper } from '../../axios/paperAxios';
import Loading from '../Loading/loading';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: '',
      user: {},
      showFollow: true,
      works: [],

      following: [],
    };
  }

  componentDidMount() {
    let { email } = this.state;

    email = this.props.match.params.email;
    this.setState({ email });

    fetchProfile(email, (err, axios_data) => {
      if (!err) {
        this.setState({ user: axios_data, loading: false });
      }
    });

    getPaperFromdb(email, (err2, papers) => {
      if (!err2) {
        this.setState({ works: papers });
      }
    });

    let data = {
      follower: this.props.match.params.email,
    };

    fetchFollowing(data, (err, axios_data) => {
      if (!err) {
        this.setState({ following: axios_data });
      }
    });

    this.showFollow();
  }

  componentDidUpdate() {
    const { email } = this.state;

    if (email !== this.props.match.params.email) {
      this.showFollow();

      this.setState({ loading: true, email: this.props.match.params.email });
      fetchProfile(this.props.match.params.email, (err, axios_data) => {
        if (!err) {
          this.setState({ user: axios_data, loading: false });
        }
      });

      getPaperFromdb(email, (err2, papers) => {
        if (!err2) {
          this.setState({ works: papers });
        }
      });

      let data = {
        follower: this.props.match.params.email,
      };

      fetchFollowing(data, (err, axios_data) => {
        if (!err) {
          this.setState({ following: axios_data });
        }
      });
    }
  }

  handleFollow = () => {
    let { user, showFollow } = this.state;

    let data = {
      user: user.email,
      follower: this.props.user.email,
    };

    if (showFollow) {
      follow(data, (err, axios_data) => {
        if (!err) alert('you are now following ' + user.name);
      });
    } else {
      unfollow(data, (err, axios_data) => {
        if (!err) alert('you have unfollowed ' + user.name);
      });
    }

    showFollow = !showFollow;
    this.setState({ showFollow });
  };

  showFollow = () => {
    // check the users following list
    let data = {
      follower: this.props.user.email,
    };

    fetchFollowing(data, (err, axios_data) => {
      if (!err) {
        console.log(axios_data);
        for (let i = 0; i < axios_data.length; i++) {
          if (axios_data[i].email === this.props.match.params.email) {
            this.setState({ showFollow: false });
            return;
          }
        }
      }
    });
  };

  handleDelete = (title) => {
    let { works } = this.state;
    const { user } = this.props;

    let data = {
      title: title,
      author: user.email,
    };

    this.setState({ loading: true });
    deletePaper(data, (err, axios_data) => {
      if (!err) {
        let idx = -1;
        for (let i = 0; i < works.length; i++) {
          if (works[i].title === title) {
            idx = i;
            break;
          }
        }

        if (idx !== -1) works.splice(idx, 1);
        this.setState({ loading: false, works });
        alert('successfully deleted');
      } else {
        alert('error occurred while deleting');
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, user, following, showFollow } = this.state;

    const profile_picture =
      'https://ui-avatars.com/api/?name=' +
      user.name +
      '&background=007ed9&color=fff&size=50';

    if (loading) return <Loading />;

    return (
      <div className={classes.mainBody}>
        <Navbar />
        <img src={profile_picture} alt="" className={classes.dp} />
        <div className={classes.name}>{user.name}</div>
        {user.email === this.props.user.email ? (
          <Link className={classes.lnk} to="/editprofile">
            edit profile
          </Link>
        ) : (
          <div className={classes.lnk} onClick={this.handleFollow}>
            {showFollow ? 'follow' : 'Unfollow'}
          </div>
        )}
        <div className={classes.contentContainer}>
          <div className={classes.slot}>
            <div className={classes.key}>Name:</div>
            <div className={classes.val}>{user.name}</div>
          </div>

          <div className={classes.slot}>
            <div className={classes.key}>Email:</div>
            <div className={classes.val}>{user.email}</div>
          </div>

          <div className={classes.slot}>
            <div className={classes.key}>Subject:</div>
            <div className={classes.val}>{user.subject}</div>
          </div>

          <div className={classes.slot}>
            <div className={classes.key}>Institution:</div>
            <div className={classes.val}>{user.institution}</div>
          </div>

          <div className={classes.slot}>
            <div className={classes.key}>skills:</div>
            <div className={classes.val}>
              {user.skill ? user.skill.join(', ') : null}
            </div>
          </div>
        </div>

        <div
          style={{
            color: 'grey',
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '50px',
          }}>
          Following
        </div>
        <div className={classes.following}>
          {following.map((obj, idx) => (
            <Link
              key={idx}
              className={classes.fol}
              to={'/profile/' + obj.email}>
              {obj.name}
            </Link>
          ))}
        </div>

        <div
          style={{
            color: 'grey',
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '50px',
          }}>
          Works
        </div>
        <div className={classes.works}>
          {this.state.works
            ? this.state.works.map((obj, idx) => (
                <PaperBox
                  paper={obj}
                  key={idx}
                  handleDelete={this.handleDelete}
                  showDelete={user.email === this.props.user.email}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>
    {({ user }) => <Profile {...props} user={user} />}
  </AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
