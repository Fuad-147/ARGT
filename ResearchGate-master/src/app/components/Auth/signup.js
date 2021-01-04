import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { register } from '../../axios/authAxios';
import { AuthConsumer } from '../../statehandler/authContext';
import { fetchProfile } from '../../axios/profileAxios';

import styles from './loginStyles';

import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      institution: '',
      subject: '',
      skills: [],
      password: '',
      confirmPassword: '',
      skillName: '',

      showPassword: false,
      showConfirmPassword: false,

      errorSignin: {
        name: false,
        email: false,
        institution: false,
        skills: false,
        subject: false,
        password: false,
        confirmPassword: false,
      },

      errorMsg: {
        name: "name can't be empty",
        email: 'email exists',
        institution: 'fill up where you are currently studying or working',
        skills: 'let us know your skills(at least one)',
        subject: 'fill your area of expertise',
        password: 'password should contain at least 7 characters',
        confirmPassword: "password didn't match",
      },
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSignup = () => {
    const {
      name,
      email,
      password,
      subject,
      institution,
      skills,
      confirmPassword,
      errorSignin,
    } = this.state;

    // do data validation
    let isValid = true;
    if (name.length === 0) {
      console.log('name vul');
      errorSignin.name = true;
      isValid = false;
    }

    if (email.length === 0) {
      console.log('email vul');
      errorSignin.email = true;
      isValid = false;
    }

    if (password.length < 7) {
      console.log('pass vul');
      errorSignin.password = true;
      isValid = false;
    }

    if (subject.length === 0) {
      console.log('sub vul');
      errorSignin.subject = true;
      isValid = false;
    }

    if (institution.length === 0) {
      console.log('institute vul');
      errorSignin.institution = true;
      isValid = false;
    }

    if (skills.length === 0) {
      console.log('skills vul');
      errorSignin.skills = true;
      isValid = false;
    }

    if (password !== confirmPassword) {
      console.log('pass match korenai');
      isValid = false;
    }

    if (isValid === false) {
      this.setState({ errorSignin });
      return;
    }

    const data = {
      name: name,
      email: email,
      institution: institution,
      subject: subject,
      skill: skills,
      password: password,
    };

    console.log(data);

    register(data, (err, userData) => {
      if (err) alert('error in register' + err);
      else {
        register(data, (err, userdata) => {
          console.log('registered', userData);
          if (!err) {
            fetchProfile(email, (err, axios_data) => {
              if (err) alert('error while fetching your info' + err);
              else {
                this.props.setLoggedIn(axios_data);
              }
            });
          }
        });
      }
    });
  };

  handleDelete = (i) => {
    const skills = this.state.skills.slice(0);
    skills.splice(i, 1);
    this.setState({ skills });
  };

  handleAddition = (event) => {
    let { skills, skillName } = this.state;

    if (event.keyCode === 13) {
      skillName = skillName.replace(/(\r\n|\n|\r)/gm, '');
      skills.push(skillName);
      skillName = '';
    }

    this.setState({ skillName, skills });
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      showPassword,
      errorSignin,
      errorMsg,
      showConfirmPassword,
      confirmPassword,
      name,
      institution,
      subject,
      skills,
      skillName,
    } = this.state;

    return (
      <div className={classes.mainBody}>
        <p className={classes.loginHead}>Sign Up</p>
        <TextField
          required
          onChange={this.handleChange('name')}
          value={name}
          id="name"
          label="name"
          className={classes.txtField}
          error={errorSignin.name}
          type="text"
          helperText={errorSignin.name === false ? '' : errorMsg.name}
        />

        <TextField
          required
          onChange={this.handleChange('email')}
          value={email}
          id="email"
          label="email"
          className={classes.txtField}
          error={errorSignin.email}
          type="email"
          helperText={errorSignin.email === false ? '' : errorMsg.email}
        />

        <TextField
          required
          onChange={this.handleChange('institution')}
          value={institution}
          id="institution"
          label="institution"
          className={classes.txtField}
          error={errorSignin.institution}
          type="text"
          helperText={
            errorSignin.institution === false ? '' : errorMsg.institution
          }
        />

        <TextField
          required
          onChange={this.handleChange('subject')}
          value={subject}
          id="subject"
          label="subject"
          className={classes.txtField}
          error={errorSignin.subject}
          type="text"
          helperText={errorSignin.subject === false ? '' : errorMsg.subject}
        />

        <div className={classes.pr}>
          write skill names. press enter after each skill
        </div>
        <div className={classes.tagContainer}>
          {skills.map((obj, idx) => (
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
          onChange={this.handleChange('skillName')}
          value={skillName}
          onKeyDown={this.handleAddition}
          style={{
            marginTop: '15px',
            width: '100%',
            marginBottom: '20px',
          }}
          id="outlined-multiline-static"
          label="skill"
          multiline
          rows="1"
          variant="outlined"
          inputProps={{
            style: { fontSize: '15px' },
          }}
        />

        <TextField
          required
          error={errorSignin.password}
          helperText={errorSignin.password === false ? '' : errorMsg.password}
          id="signup-password"
          className={classes.txtField}
          value={password}
          type={showPassword ? 'text' : 'password'}
          label="password"
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={() =>
                    this.setState({
                      showPassword: !showPassword,
                    })
                  }>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          required
          error={password !== confirmPassword}
          helperText={
            errorSignin.confirmPassword === false
              ? ''
              : errorMsg.confirmPassword
          }
          id="signupconfirm-password"
          className={classes.txtField}
          value={confirmPassword}
          type={showConfirmPassword ? 'text' : 'password'}
          label="confirm-password"
          onChange={this.handleChange('confirmPassword')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={() =>
                    this.setState({
                      showConfirmPassword: !showConfirmPassword,
                    })
                  }>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <div className={classes.loginBtn} onClick={this.handleSignup}>
          Sign Up
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>
    {({ setLoggedIn }) => <Signup {...props} setLoggedIn={setLoggedIn} />}
  </AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
