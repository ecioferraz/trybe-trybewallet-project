import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SelectInput extends Component {
  render() {
    const { labelText, name, value, options, onChange } = this.props;
    return (
      <>
        <label htmlFor={ name } className="mr-sm-2">
          { labelText }
          {' '}
        </label>
        <select
          type="select"
          name={ name }
          value={ value }
          onChange={ onChange }
          id={ name }
        >
          {options.map((currency) => (
            <option key={ currency } value={ currency }>{currency}</option>
          ))}
        </select>
      </>
    );
  }
}

SelectInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
