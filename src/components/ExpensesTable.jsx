import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense as removeExpenseAction } from '../actions';
import '../styles/expensestable.css';

class ExpensesTable extends Component {
  render() {
    const { expenses, removeExpense } = this.props;
    const titles = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <section className="table-section">
        <table>
          <thead>
            <tr>
              { titles.map((title, index) => <th key={ index }>{ title }</th>)}
            </tr>
          </thead>
          <tbody>
            { expenses.map(({
              description, tag, method, currency, value, exchangeRates, id,
            }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ Number(exchangeRates[currency].ask * value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  {/* <Button type="button" className="expenseBtn">
                    Editar
                  </Button> */}
                  <button
                    className="expense-btn"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => removeExpense(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(removeExpenseAction(expense)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
