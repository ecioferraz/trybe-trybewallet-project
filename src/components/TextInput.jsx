import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TextInput extends Component {
  render() {
    const { className, labelText, type, name, value,
      onChange, placeholder, dataTestId } = this.props;

    return (
      <>
        <label htmlFor={ name }>
          { labelText }
          {' '}
        </label>
        <input
          className={ className }
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          id={ name }
          placeholder={ placeholder }
          data-testid={ dataTestId }
        />
      </>
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  dataTestId: PropTypes.string,
};

TextInput.defaultProps = {
  labelText: '',
  placeholder: '',
  dataTestId: '',
};
