import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AuthConsumer } from '../../statehandler/authContext';

import Loading from '../Loading/loading';
import { postPaper } from '../../axios/paperUploadAxios';
import Navbar from '../Navbar/Navbar';

import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import styles from './PaperUploadStyles';

class PaperUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: '',
      abstract: '',
      tagName: '',
      tags: [],

      suggestions: [],

      file: {},
      errors: {
        title: false,
        abstract: false,
      },
    };
  }

  handleDelete = (i) => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  };

  handleAddition = (event) => {
    let { tags, tagName } = this.state;

    if (event.keyCode === 13) {
      tagName = tagName.replace(/(\r\n|\n|\r)/gm, '');
      tags.push(tagName);
      tagName = '';
    }

    this.setState({ tagName, tags });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  onChangeHandler = (event) => {
    if (event.target.files[0].type !== 'application/pdf') {
      alert('upload pdf file!!');
    } else this.setState({ file: event.target.files[0] });
  };

  handleUpload = () => {
    let { title, abstract, errors, file, tags } = this.state;

    errors.title = false;
    errors.abstract = false;
    let isValid = true;

    if (title === '') {
      isValid = false;
      errors.title = true;
    }

    if (abstract === '') {
      isValid = false;
      errors.abstract = true;
    }

    if (!file.name) {
      isValid = false;
      alert('upload the paper');
    }

    this.setState({ errors });
    if (isValid === false) return;

    this.setState({ loading: true });

    // everything is Valid, call axios
    var blob = file.slice(0, file.size, 'application/pdf');
    var newFile = new File([blob], title + '.pdf', { type: 'application/pdf' });

    this.setState({ loading: true });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', newFile);
    formData.append('abstract', abstract);
    formData.append('author', this.props.user.email);
    formData.append('tag', JSON.stringify(tags));

    postPaper(formData, (err, data) => {
      if (err) {
        alert('error uploading');
        this.setState({ loading: false });
      } else {
        title = '';
        abstract = '';
        tags = [];
        file = {};

        alert('successfully uploaded');
        this.setState({ title, abstract, tags, file, loading: false });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { title, abstract, errors, tagName, tags, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div className={classes.mainBody}>
        <Navbar />
        <div className={classes.head}>Upload a Paper</div>
        <div className={classes.fieldContainer}>
          <div className={classes.pr}>title of the paper</div>
          <TextField
            onChange={this.handleChange('title')}
            value={title}
            style={{
              marginTop: '15px',
              width: '90%',
              marginBottom: '20px',
              marginLeft: '10px',
            }}
            id="outlined-multiline-static"
            label="title"
            multiline
            rows="1"
            error={errors.title}
            helperText={errors.title ? "title can't be empty" : ''}
            variant="outlined"
            inputProps={{
              style: { fontSize: '15px' },
            }}
          />

          <div className={classes.pr}>abstract of the paper</div>
          <TextField
            onChange={this.handleChange('abstract')}
            value={abstract}
            style={{
              marginTop: '15px',
              width: '90%',
              marginBottom: '20px',
              marginLeft: '10px',
            }}
            id="outlined-multiline-static"
            label="Abstract"
            multiline
            rows="7"
            error={errors.abstract}
            helperText={errors.abstract ? "abstract can't be empty" : ''}
            variant="outlined"
            inputProps={{
              style: { fontSize: '15px' },
            }}
          />

          <div className={classes.pr}>
            write tag names. press enter after each tag
          </div>
          <div className={classes.tagContainer}>
            {tags.map((obj, idx) => (
              <div
                key={idx}
                className={classes.chip}
                onClick={() => this.handleDelete(idx)}>
                {obj}&nbsp;
                <CancelIcon />
              </div>
            ))}
          </div>

          <TextField
            onChange={this.handleChange('tagName')}
            value={tagName}
            onKeyDown={this.handleAddition}
            style={{
              marginTop: '15px',
              width: '90%',
              marginBottom: '20px',
              marginLeft: '10px',
            }}
            id="outlined-multiline-static"
            label="tag"
            multiline
            rows="1"
            variant="outlined"
            inputProps={{
              style: { fontSize: '15px' },
            }}
          />

          <div className={classes.pr}>upload the pdf of the paper</div>
          <input
            className={classes.inp}
            type="file"
            name="file"
            onChange={this.onChangeHandler}
          />

          <div className={classes.btn} onClick={this.handleUpload}>
            upload
          </div>
        </div>
      </div>
    );
  }
}

PaperUpload.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>
    {({ user }) => <PaperUpload {...props} user={user} />}
  </AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
