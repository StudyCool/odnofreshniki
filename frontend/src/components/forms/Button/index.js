import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import styles     from './Button.module.scss';

const Button = ({ className, disabledStyles, ...rest }) => {

  const classNameValue = classNames( styles.button, className);

  return (
    <button className={classNameValue} {...rest}/>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;