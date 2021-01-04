import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { timeElapsed } from '../../util/timeElapsed';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
  mainBody: {
    width: '100%',
    padding: '15px',
    margin: '10px',

    border: '1px solid grey',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  title: {
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bolder',
  },

  up: {
    color: 'black',
    fontSize: '17px',
    fontWeight: '500',

    marginTop: '10px',
  },

  time: {
    color: 'grey',
    fontSize: '15px',
    fontWeight: '300',
  },

  lnk: {
    wordWrap: 'break-word',
    fontSize: '15px',
    color: '#007ed9',
    fontWeight: 'bolder',

    marginTop: '20px',
  },

  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',

    marginTop: '15px',
  },

  tag: {
    padding: '10px',
    marginRight: '10px',
    marginBottom: '5px',

    borderRadius: '5px',
    boxShadow: '0 0 3px black',
  },
});

class PaperBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, paper } = this.props;
    console.log(paper);
    return (
      <div className={classes.mainBody}>
        <div className={classes.title}>{paper.title}</div>
        <div className={classes.up}>uploaded by {paper.author}</div>
        <div className={classes.time}>{timeElapsed(paper.timestamp)}</div>
        <div className={classes.tagContainer}>
          {paper.tag
            ? paper.tag.map((obj, idx) => (
                <div
                  key={idx}
                  className={classes.tag}
                  style={{
                    color: idx % 2 ? 'white' : '#007ed9',
                    background: idx % 2 ? '#007ed9' : 'white',
                  }}>
                  {obj}
                </div>
              ))
            : null}
        </div>

        <Link
          to={{
            pathname: '/viewpaper',
            state: {
              paper: paper,
            },
          }}
          className={classes.lnk}>
          view paper
        </Link>

        {this.props.showDelete ? (
          <div
            style={{ marginTop: '30px' }}
            onClick={() => this.props.handleDelete(paper.title)}>
            <DeleteIcon />
          </div>
        ) : null}
      </div>
    );
  }
}

PaperBox.propTypes = {
  classes: PropTypes.object.isRequired,
  paper: PropTypes.object.isRequired,
  showDelete: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(PaperBox);
