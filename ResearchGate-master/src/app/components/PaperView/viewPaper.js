import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import Config from '../../util/config';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import { timeElapsed } from '../../util/timeElapsed';
import Loading from '../Loading/loading';
import { AuthConsumer } from '../../statehandler/authContext';
import {
  sendComment,
  fetchComments,
  sendReply,
} from '../../axios/commentAxios';

const styles = (theme) => ({
  mainBody: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  title: {
    wordWrap: 'break-word',
    fontSize: '20px',
    color: 'black',

    display: 'inline-flex',
    marginBottom: '30px',

    paddingLeft: '5%',
    paddingRight: '5%',
  },

  lnk: {
    marginLeft: '5%',
    fontSize: '20px',
    fontWeight: 'bolder',
    color: 'grey',
  },

  commentContainer: {
    fontSize: '20px',
    color: 'black',

    marginTop: '30px',
    marginBottom: '30px',

    paddingLeft: '5%',
    paddingRight: '5%',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  sendComment: {
    background: '#007ed9',
    color: 'white',

    textAlign: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',

    borderRadius: '20px',
    cursor: 'pointer',
  },

  commentBox: {
    padding: '15px',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',

    border: '1px solid grey',
  },

  outerBox: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',

    marginTop: '30px',
    marginBottom: '30px',
  },

  replyBtn: {
    background: '#007ed9',
    color: 'white',

    textAlign: 'center',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',

    borderRadius: '10px',
    cursor: 'pointer',
  },

  replyBox: {
    padding: '15px',
    width: '90%',
    marginLeft: '10%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',

    border: '1px solid grey',

    marginTop: '10px',
    marginBottom: '10px',
  },
});

class ViewPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      comments: [],
      newComment: '',
      paper: {
        title: '',
      },

      showReply: -1,
      newReply: '',
    };
  }

  componentDidMount() {
    const { paper } = this.props.location.state;

    if (paper.title && paper.title.length) {
      fetchComments(paper.title, (err, axios_data) => {
        if (err) alert('unable to fetch comments, reload!!!');
        else {
          this.setState({ comments: axios_data, loading: false });
        }
      });
    } else console.log('paper title', paper.title);
  }

  componentDidUpdate() {}

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  comment = () => {
    let { newComment } = this.state;
    const { paper } = this.props.location.state;

    newComment = newComment.replace(/(\r\n|\n|\r)/gm, '');
    if (newComment.length === 0) return;

    let data = {
      title: paper.title,
      comment: newComment,
      email: this.props.user.email,
    };

    // send
    sendComment(data, (err, axios_data) => {
      if (err) {
        alert("something went wrong, couldn't comment!!!");
      } else {
        let { comments } = this.state;
        comments.unshift(axios_data);

        this.setState({ comments, newComment: '' });
      }
    });
  };

  reply = (id) => {
    let data = {
      _id: this.state.comments[id]._id,
      reply: this.state.newReply,
      email: this.props.user.email,
    };

    sendReply(data, (err, axios_data) => {
      if (!err) {
        let { comments, newReply } = this.state;

        let newEntry = {
          email: this.props.user.email,
          reply: newReply,
        };

        comments[id].reply.push(newEntry);
        this.setState({ comments, newReply: '' });
        console.log(axios_data);
      } else {
        alert('failed to reply');
        console.log(err);
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { paper } = this.props.location.state;
    const { newComment, loading, comments, newReply, showReply } = this.state;

    if (loading) return <Loading />;
    if (!paper) return <div></div>;

    return (
      <div className={classes.mainBody}>
        <Navbar />
        <div style={{ marginBottom: '50px' }}></div>
        <div className={classes.title}>
          <div style={{ fontWeight: 'bolder', marginRight: '10px' }}>
            Title:
          </div>
          <div>{paper.title}</div>
        </div>

        <div className={classes.title}>
          <div style={{ fontWeight: 'bolder', marginRight: '10px' }}>
            Abstract:
          </div>
          <div>{paper.abstract}</div>
        </div>

        <a
          href={Config.BASE_API_URL + paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.lnk}>
          read paper
        </a>

        <div className={classes.commentContainer}>
          <TextField
            onChange={this.handleChange('newComment')}
            value={newComment}
            style={{
              marginTop: '15px',
              width: '100%',
              marginBottom: '20px',
            }}
            id="outlined-multiline-static"
            label="write a comment"
            multiline
            rows="3"
            variant="outlined"
            inputProps={{
              style: { fontSize: '15px' },
            }}
          />

          <div className={classes.sendComment} onClick={this.comment}>
            comment
          </div>

          {comments.map((obj, idx) => (
            <div key={idx} className={classes.outerBox}>
              <div className={classes.commentBox}>
                <div
                  style={{
                    display: 'inline-flex',
                    fontSize: '20px',
                  }}>
                  <Link
                    to={'/profile/' + obj.email}
                    style={{
                      color: '#007ed9',
                      fontWeight: '500',
                      textDecoration: 'none',
                    }}>
                    {obj.email}
                  </Link>
                  &nbsp;commented
                </div>
                <div
                  style={{
                    color: 'grey',
                    fontWeight: '300',
                    fontSize: '15px',
                  }}>
                  {timeElapsed(obj.timestamp)}
                </div>
                <div
                  style={{
                    color: 'black',
                    fontWeight: '300',
                    marginTop: '10px',
                  }}>
                  {obj.comment}
                </div>
              </div>
              <div
                onClick={() => this.setState({ showReply: idx })}
                style={{
                  width: '100%',
                  textAlign: 'right',
                  fontSize: '15px',
                  color: '#007ed9',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                reply
              </div>
              {showReply === idx ? (
                <TextField
                  onChange={this.handleChange('newReply')}
                  value={newReply}
                  style={{
                    marginTop: '15px',
                    width: '90%',
                    marginLeft: '10%',
                    marginBottom: '20px',
                  }}
                  id="outlined-multiline-static"
                  label="write a reply"
                  multiline
                  rows="1"
                  variant="outlined"
                  inputProps={{
                    style: { fontSize: '15px' },
                  }}
                />
              ) : null}

              {showReply === idx ? (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <div
                    className={classes.replyBtn}
                    onClick={() => this.reply(idx)}>
                    reply
                  </div>
                </div>
              ) : null}

              {obj.reply.map((rep, jdx) => (
                <div key={comments.length + jdx} className={classes.replyBox}>
                  <div
                    style={{
                      display: 'inline-flex',
                      fontSize: '20px',
                    }}>
                    <Link
                      to={'/profile/' + rep.email}
                      style={{
                        color: '#007ed9',
                        fontWeight: '500',
                        textDecoration: 'none',
                      }}>
                      {rep.email}
                    </Link>
                    &nbsp;replied
                  </div>
                  <div
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      marginTop: '10px',
                    }}>
                    {rep.reply}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ViewPaper.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>
    {({ user }) => <ViewPaper {...props} user={user} />}
  </AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
