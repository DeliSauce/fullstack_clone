import React from 'react';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';
import sessionModalStyle from '../../../app/assets/stylesheets/modals/session_modal_style';
import merge from 'lodash/merge';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
        username: "",
        password: "",
        email: "",
        usernameError: false,
        passwordError: false,
        emailError: false,
        loginError: false
    };

    this.state = this.defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.checkForErrors(nextProps);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {user: this.state};
    if (this.formType() === 'login') {
      this.props.processLoginForm(user);
    } else {
      this.props.processSignupForm(user);
    }
  }

  formType(){
    if (this.props.loginModalStatus) {
      return 'login';
    } else if (this.props.signupModalStatus) {
      return 'signup';
    } else {
      return 'error';
    }
  }

  header() {
    if (this.formType() === 'login') {
      return (<div className="form-header-login">Log In To Sheeple</div>);
    } else {
      return (<div className="form-header-signup">Sign Up For A New Account</div>);
    }
  }

  renderEmail() {
    if (this.formType() === 'signup') {
      return (
        <label> Email
          <input
            type="text"
            value={this.state.email}
            onChange={this.update('email')}
            className={this.setInputFieldClassName('email')}
          />
        </label>
      );
    }
  }

  closeModal() {
    this.setState(this.defaultState);
    this.props.clearErrors();
    this.props.toggleSessionForm(this.formType());
  }

  update(field) {
    let fieldError = false;
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
      if (field === 'username') {
        if (this.formType() === 'signup') {
          this.props.checkUserNameAvailability({user: {username: e.currentTarget.value}});
        }
        fieldError = 'usernameError';
      }
      if (field === 'password') {
      fieldError = e.currentTarget.value.length >= 6 ? 'passwordError' : '';
      }
      if (field === 'email') {
        fieldError = 'emailError';
      }
      if (fieldError) this.setState({[fieldError]: false});
    };
  }

  buttonText() {
    if (this.formType() === 'login') {
      return "LOGIN";
    } else {
      return "SIGN UP";
    }
  }

  switchFormLink() {
    if (this.formType() === 'signup') {
      return (
        <div className='session-form-footer'>
          <p>
            Already have an account? <a onClick={this.switchForms.bind(this)}>Log in</a>
          </p>
          <p>
            or log in with a <a onClick={this.guestLogin.bind(this)}>Guest Account</a>.
          </p>
        </div>
      );
    } else {
      return (
        <div className='session-form-footer'>
          <p>
            Dont have an account? <a onClick={this.switchForms.bind(this)}>Sign up</a> for one
          </p>
          <p>
            or log in with a <a onClick={this.guestLogin.bind(this)}>Guest Account</a>.
          </p>
        </div>
      );
    }
  }

  switchForms () {
    let newForm = (this.formType() === 'signup' ? 'login' : 'signup');
    this.closeModal();
    this.props.toggleSessionForm(newForm);
  }

  guestLogin(){
    this.closeModal();
    this.props.loginGuest();
  }

  setInputFieldClassName(field) {
    if ((this.state.usernameError || this.state.loginError) && field === 'username') {
      return 'form-input-error';
    }
    if ((this.state.passwordError || this.state.loginError) && field === 'password') {
      return 'form-input-error';
    }
    if ((this.state.emailError) && field === 'email') {
      return 'form-input-error';
    }
  }

  // List of error messages:
  // "Invalid username/password combination",
  // "Username has already been taken",
  // "Username can't be blank",
  // "Password is too short (minimum is 6 characters)",
  // "Email can't be blank",
  // "Email not a valid",

  //TODO method will only account for one error per field even if there are multiple
  checkForErrors(nextProps) {
    nextProps.errors.forEach(error => {
      if (error === 'Invalid username/password combination') {
        this.setState({loginError: error});
      } else if (error.toLowerCase().includes('username')) {
        this.setState({usernameError: error});
      } else if (error.toLowerCase().includes('password')) {
        this.setState({passwordError: error});
      } else if (error.toLowerCase().includes('email')) {
        this.setState({emailError: error});
      }
    });
  }

  renderUsernameError() {
    if (this.state.usernameError) {
      return (
        <div className='form-error'>
          {this.state.usernameError}
        </div>
      );
    } else {
      return (
        <div className='form-error'></div>
      );
    }
  }

  renderPasswordOrLoginError() {
    if (this.state.passwordError) {
      return (
        <div className='form-error'>
          {this.state.passwordError}
        </div>
      );
    } else if (this.state.loginError) {
      return (
        <div className='form-error'>
          {this.state.loginError}
        </div>
      );
    }
    else {
      return (
        <div className='form-error'></div>
      );
    }
  }

  renderEmailError(){
    if (this.formType() === 'login') {
      return;
    } else if (this.state.emailError) {
      return (
        <div className='form-error'>
          {this.state.emailError}
        </div>
      );
    } else {
      return (
        <div className='form-error'></div>
      );
    }
  }

  modalStyle() {
    const loginHeight = {content : {height: '370px'}};
    const signupHeight = {content : {height: '450px'}};
    if (this.formType() === 'login') {
      return merge(sessionModalStyle, loginHeight);
    } else {
      return merge(sessionModalStyle, signupHeight);
    }
  }

  render (){
    return (
      <Modal
        isOpen={this.props.loginModalStatus || this.props.signupModalStatus}
        onRequestClose={this.closeModal.bind(this)}
        contentLabel="Modal"
        style={this.modalStyle()}
      >
        <form onSubmit={this.handleSubmit} className="form session-form">
          {this.header()}
          <div className="form-body">
            <div className="form-inputs-session">
              <label> Username
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className={this.setInputFieldClassName('username')}
                  autoFocus
                  />
              </label>
              {this.renderUsernameError()}

              <label> Password
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className={this.setInputFieldClassName('password')}
                  />
              </label>
              {this.renderPasswordOrLoginError()}

              {this.renderEmail()}
              {this.renderEmailError()}
            </div>
            <input type="submit" className="form-submit-button button" value={this.buttonText()}/>
            {this.switchFormLink()}
          </div>
        </form>
      </Modal>
    );
  }
}

export default withRouter(SessionForm);
