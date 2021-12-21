import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getExpenses as getExpensesAction } from '../actions';
import currencyAPI from '../services/currencyAPI';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import {
  valueInput,
  descriptionInput,
  methods,
  tags,
  currencyInput,
  methodInput,
  tagInput } from '../data';
import '../styles/expenses.css';

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleSelectInput = this.handleSelectInput.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { getExpenses } = this.props;
    const exchangeRates = await currencyAPI();
    this.setState({ exchangeRates });
    getExpenses(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  handleTextInput({ label, type, name }, value, onChange) {
    return (
      <div>
        <TextInput
          className="expenses-input"
          labelText={ label }
          name={ name }
          onChange={ onChange }
          type={ type }
          value={ value }
        />
      </div>
    );
  }

  handleSelectInput({ label, name }, value, options, onChange) {
    return (
      <div>
        <SelectInput
          className="expenses-input select-input"
          labelText={ label }
          name={ name }
          onChange={ onChange }
          options={ options }
          value={ value }
        />
      </div>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form onSubmit={ this.handleSubmit } className="expenses-form input-container">

        { this.handleTextInput(valueInput, value, this.handleChange)}
        { this.handleTextInput(descriptionInput, description, this.handleChange) }
        { this.handleSelectInput(
          currencyInput, currency, currencies, this.handleChange,
        ) }
        { this.handleSelectInput(
          methodInput, method, methods, this.handleChange,
        ) }
        { this.handleSelectInput(
          tagInput, tag, tags, this.handleChange,
        ) }
        <button className="expense-btn" disabled={ !value || !description } type="submit">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({ currencies });

const mapDispatchToProps = (dispatch) => ({
  getExpenses: (expenses) => dispatch(getExpensesAction(expenses)),
});

Expenses.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
