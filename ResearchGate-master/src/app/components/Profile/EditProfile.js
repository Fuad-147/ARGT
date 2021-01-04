import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from '../Auth/loginStyles';
import { AuthConsumer } from '../../statehandler/authContext';
import Navbar from '../Navbar/Navbar';
import { updateProfile } from '../../axios/profileAxios';

import Loading from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: this.props.user,
      name: '',
      email: '',
      institution: '',
      subject: '',
      skills: [],

      password: '',
      confirmPassword: '',
      oldPassword: '',
      skillName: '',

      showPassword: false,
      showConfirmPassword: false,
      showOldPassword: false,

      errorProfile: {
        name: false,
        email: false,
        institution: false,
        skills: false,
        subject: false,
        password: false,
        confirmPassword: false,
        oldPassword: false,
      },

      errorMsg: {
        name: "name can't be empty",
        email: 'email exists',
        institution: 'fill up where you are currently studying or working',
        skills: 'let us know your skills(at least one)',
        subject: 'fill your area of expertise',
        password: 'password should contain at least 7 characters',
        confirmPassword: "password didn't match",
        oldPassword: 'give the old password to confirm change',
      },
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      name: user.name,
      email: user.email,
      subject: user.subject,
      institution: user.institution,
      skills: user.skill,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  changeProfile = () => {
    const {
      name,
      email,
      password,
      subject,
      institution,
      skills,
      confirmPassword,
      errorProfile,
      oldPassword,
    } = this.state;

    // do data validation
    let isValid = true;
    if (name.length === 0) {
      errorProfile.name = true;
      isValid = false;
    }

    if (subject.length === 0) {
      errorProfile.subject = true;
      isValid = false;
    }

    if (institution.length === 0) {
      errorProfile.institution = true;
      isValid = false;
    }

    if (skills.length === 0) {
      errorProfile.skills = true;
      isValid = false;
    }

    if (password.length && password.length < 7) {
      errorProfile.password = true;
      isValid = false;
    }

    if (password !== confirmPassword) {
      isValid = false;
    }

    if (oldPassword.length === 0) {
      errorProfile.oldPassword = true;
      isValid = false;
    }

    if (isValid === false) {
      this.setState({ errorProfile });
      return;
    }

    // validation done

    const data = {
      name: name,
      email: email,
      institution: institution,
      subject: subject,
      skill: skills,
      password: password.length > 0 ? password : oldPassword,
      oldPassword: oldPassword,
    };

    console.log(data);

    const { user } = this.props;

    this.setState({ loading: true });

    updateProfile(data, (err, axios_data) => {
      console.log(err, axios_data);
      if (!err) {
        alert('updated successfully');
        this.setState({ loading: false });
        this.props.updateUser(name, subject, institution, skills);
      } else {
        alert('not successfully updated, try again!!');
        this.setState({
          name: user.name,
          email: user.email,
          subject: user.subject,
          institution: user.institution,
          skills: user.skill,
          password: '',
          confirmPassword: '',
          oldPassword: '',
          loading: false,
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
      errorProfile,
      errorMsg,
      showConfirmPassword,
      confirmPassword,
      oldPassword,
      showOldPassword,
      name,
      institution,
      subject,
      skills,
      skillName,
      user,
      loading,
    } = this.state;

    const profile_picture =
      'https://ui-avatars.com/api/?name=' +
      user.name +
      '&background=007ed9&color=fff&size=50';

    if (loading) return <Loading />;

    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Navbar />
        <div style={{ marginBottom: '50px' }}></div>
        <img
          src={profile_picture}
          alt=""
          style={{ width: '70px', height: '70px', borderRadius: 100 }}
        />
        <div className={classes.mainBody} style={{ width: '80%' }}>
          <p className={classes.loginHead}>Edit Your Profile</p>
          <TextField
            required
            onChange={this.handleChange('name')}
            value={name}
            id="name"
            label="name"
            className={classes.txtField}
            error={errorProfile.name}
            type="text"
            helperText={errorProfile.name === false ? '' : errorMsg.name}
          />

          <TextField
            required
            disabled
            onChange={this.handleChange('email')}
            value={email}
            id="email"
            label="email"
            className={classes.txtField}
            error={errorProfile.email}
            type="email"
            helperText={errorProfile.email === false ? '' : errorMsg.email}
          />

          <TextField
            required
            onChange={this.handleChange('institution')}
            value={institution}
            id="institution"
            label="institution"
            className={classes.txtField}
            error={errorProfile.institution}
            type="text"
            helperText={
              errorProfile.institution === false ? '' : errorMsg.institution
            }
          />

          <TextField
            required
            onChange={this.handleChange('subject')}
            value={subject}
            id="subject"
            label="subject"
            className={classes.txtField}
            error={errorProfile.subject}
            type="text"
            helperText={errorProfile.subject === false ? '' : errorMsg.subject}
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
            error={errorProfile.password}
            helperText={
              errorProfile.password === false ? '' : errorMsg.password
            }
            id="signup-password"
            className={classes.txtField}
            value={password}
            type={showPassword ? 'text' : 'password'}
            label="new password"
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
              errorProfile.confirmPassword === false
                ? ''
                : errorMsg.confirmPassword
            }
            id="signupconfirm-password"
            className={classes.txtField}
            value={confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            label="confirm new password"
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

          <TextField
            required
            id="signupconfirm-oldpassword"
            error={errorProfile.oldPassword}
            helperText={
              errorProfile.oldPassword === false ? '' : errorMsg.oldPassword
            }
            className={classes.txtField}
            value={oldPassword}
            type={showOldPassword ? 'text' : 'password'}
            label="enter old password to confirm edit"
            onChange={this.handleChange('oldPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="Toggle password visibility"
                    onClick={() =>
                      this.setState({
                        showOldPassword: !showOldPassword,
                      })
                    }>
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className={classes.loginBtn} onClick={this.changeProfile}>
            Submit
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ConsumerComponent = (props) => (
  <AuthConsumer>
    {({ user, updateUser }) => (
      <EditProfile {...props} user={user} updateUser={updateUser} />
    )}
  </AuthConsumer>
);

export default withStyles(styles)(ConsumerComponent);
