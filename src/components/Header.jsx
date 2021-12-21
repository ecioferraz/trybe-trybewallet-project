import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((total, { value, exchangeRates, currency }) => {
      total += value * exchangeRates[currency].ask;
      return total;
    }, 0);

    return (
      <header>
        <h1>TrybeWallet</h1>
        <ul className="user-info">
          <li data-testid="email-field">{ email } email@email.com</li>
          <li data-testid="total-field">{ (totalExpenses).toFixed(2) } BRL</li>
          <li hidden data-testid="header-currency-field">BRL</li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
