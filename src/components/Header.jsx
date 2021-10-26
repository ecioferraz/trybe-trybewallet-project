import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((total, { value, exchangeRates, currency }) => {
      total += value * exchangeRates[currency].ask;
      return total;
    }, 0);

    return (
      <header>
        <div className="logo">
          <p>TrybeWallet</p>
        </div>
        <div className="user-info">
          <ul>
            <li data-testid="email-field">{ email }</li>
            <li data-testid="total-field">{ (totalExpenses).toFixed(2) }</li>
            <li data-testid="header-currency-field">BRL</li>
          </ul>
        </div>
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
