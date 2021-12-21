import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login as loginAction } from '../actions';
import TextInput from '../components/TextInput';
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  disableBtn() {
    const { email, password } = this.state;
    const MIN_LENGTH = 5;

    const disable = !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/.test(email)
      && password.length > MIN_LENGTH);
      // ref https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e
    return disable;
  }

  handleInput(dataTestId, placeholder, type, value) {
    return (
      <TextInput
        className="login-input"
        dataTestId={ dataTestId }
        htmlFor={ type }
        placeholder={ placeholder }
        name={ type }
        onChange={ this.handleChange }
        type={ type }
        value={ value }
      />
    );
  }

  render() {
    const { email, password } = this.state;
    const { login } = this.props;
    return (
      <>
        <main className="landing-page">
          <form className="login-form">
            <h6 className="greetings">Olá! Faça seu login:</h6>
            <div className="input-container">
              { this.handleInput('email-input', 'Email', 'email', email) }
            </div>
            <div className="input-container">
              { this.handleInput('password-input', 'Senha', 'password', password) }
            </div>
            <Link
              to="/trybe-trybewallet-project/carteira"
              style={ (this.disableBtn()) ? { pointerEvents: 'none' } : null } // ref https://newbedev.com/easier-way-to-to-disable-link-in-react
            >
              <button
                className="login-btn"
                color="primary"
                type="button"
                disabled={ this.disableBtn() }
                onClick={ () => login({ email }) }
              >
                Entrar
              </button>
            </Link>
          </form>
        </main>
        <footer className="image-credit">
          <a href="https://www.vecteezy.com/free-vector/finance">
            Finance Vectors by Vecteezy
          </a>
        </footer>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
